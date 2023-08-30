import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { LoadImageService } from 'src/app/Service/load-image.service';
import { Article } from 'src/interfaces/article';
import { Category } from 'src/interfaces/categories';
import { Vente } from 'src/interfaces/vente';
import notification from 'sweetalert2'

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit, OnChanges {
  @Output() addArticleEvent: EventEmitter<Partial<Vente>> = new EventEmitter<Partial<Vente>>();
  @Output() updateArticleEvent: EventEmitter<Partial<Vente>> = new EventEmitter<Partial<Vente>>();
  @Input() updateData: Partial<Vente> = {};
  @Input() allData: {
    articles: Partial<Vente[]>;
    categories: Partial<Category[]>;
    confection: Partial<Article[]>;
  } = {
    articles: [],
    categories: [],
    confection: [],
  };
  confectionsTable: string[] = [];
  articleIds:number[] = [];
  position:number = 0;
  categorieName: string = '';
  promo: boolean = true;
  total: number = 0;
  btnSubmit: boolean = true;
  libellePattern:string = '^[a-zA-Z]{3,30}$';
  numberPattern:string = '^[0-9]*$';
  useForm = this.fb.group({
    libelle: ['', [Validators.required, Validators.pattern(this.libellePattern)]],
    categorie_id: [0, Validators.required],
    ref: ['', Validators.required],
    cout_fabrication: [0, [Validators.required, Validators.pattern(this.numberPattern)]],
    prix_de_vente: [0, [Validators.required, Validators.pattern(this.numberPattern)]],
    marge: [0, [Validators.required, Validators.pattern(this.numberPattern)]],
    promoCheck: [false],
    promotion: [0],
    confectionId: [0, Validators.required],
    article: this.fb.array([])
  });  
  searchResult: any[] = [];
  constructor(
    protected imageService: LoadImageService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}
  get confections():FormArray<any>{
    return this.useForm.get('article') as FormArray
  }
  ngOnChanges(changes:SimpleChanges) {
    if (changes['updateData'] && this.updateData) {
      console.log(this.updateData);
      this.renderEditedData();
    }
  }

  addArticleVente() {
    const formData = this.useForm.value;
    const articlesData = this.confections.controls.map(control => {
      return {
        article_id: control.get('article_id')?.value,
        quantite: control.get('quantite')?.value
      };
    });

    const venteData = this.createVenteData(formData);
    
    if(Object.keys(this.updateData).length == 0 ){
      console.log(venteData);
      if(this.useForm.value.categorie_id === 0){
        notification.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Veuillez choisir une categorie!',
        });
        return;
      }
      if(this.confections.controls.length < 3){
        notification.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Veuillez ajouter au moins 3 articles!',
        });
        return;
      }
      if(this.useForm.invalid || this.confections.invalid){
        notification.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Veuillez remplir et valider tous les champs!',
        });
        return;
      }
      if(!this.confectionsTable.includes('tissu') && !this.confectionsTable.includes('fil') && !this.confectionsTable.includes('bouton') || this.confectionsTable.length < 3 || this.articleIds.length < 3){
        notification.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'les articles doivent au moins contenir un tissu, un fil et un bouton!',
        });
        return;
      }
    this.addArticleEvent.emit({ ...venteData, article: articlesData, image: this.imageService.thumbnail });
  } else {
    console.log('update');
    this.updateArticle({ ...venteData, article: articlesData, image: this.imageService.thumbnail, id: this.updateData.id })
    this.updateData = {};
  }
  // this.resetForm();
  }
  duplicateInputField() {
    console.log(this.confections.value);
      this.confections.push(this.fb.group({
        libelle: ['', [Validators.required, Validators.pattern(this.libellePattern)]],
        quantite: [0, [Validators.required, Validators.pattern(this.numberPattern)]],
        article_id: [0, Validators.required],
      }));

  }
  refInput(e?: Event):void {
    const inputElement = e?.target as HTMLInputElement;
    const categorieId = inputElement?.value;
    let result =  this.allData.categories.find((categorie):boolean => categorie?.id == +categorieId);
    if(result){
      this.categorieName = result.libelle.toLocaleUpperCase();
    }
    const lib = this.useForm.value.libelle?.substring(0,3);
    this.useForm.get('ref')?.patchValue(`REF-${lib?.toUpperCase()}-${this.categorieName}-${result?.count}`);
  }
  selectConfection(e:Event) {
    this.useForm.get('confectionId')?.patchValue(0);
    const inputElement = e?.target as HTMLInputElement;
    const confectionId = inputElement?.value;
    console.log(confectionId);
    
    let result =  this.allData.confection.find((article):boolean => article?.id == +confectionId);
    if(result){
      this.useForm.get('confectionId')?.patchValue(result.id);      
      this.confections.controls[this.position].get('libelle')?.patchValue(result.libelle);
      this.confections.controls[this.position].get('article_id')?.patchValue(result.id);

    }
    this.searchResult = [];
  }
  searchConfection(event: Event,pos: number) {
    this.position = pos;
    const value = (event.target as HTMLInputElement).value;
    this.searchResult = this.allData.confection.filter((article): boolean => {
      if(article?.id && value === article?.libelle && !this.articleIds.includes(article?.id)){
        this.confections.controls[pos].patchValue({
          libelle: article?.libelle,
          article_id: article?.id
        });
        this.articleIds.push(article?.id);
        this.confectionsTable.push(article.libelle);
        console.log(this.confections.controls[pos].get('article_id')?.value);
        console.log(this.articleIds,this.confectionsTable,article?.id, this.confections.controls[pos].get('libelle')?.value,article?.libelle);
      }
      return article?.libelle.toLowerCase().search(value.toLowerCase()) !== -1;
    });
  }
  quantityCheck(e:Event,pos:number) {
    const inputElement = e?.target as HTMLInputElement;
    let quantite = +inputElement?.value;
      if(!this.confectionsTable.includes(this.confections.controls[pos].get('libelle')?.value)){
       this.confections.controls[pos].get('quantite')?.patchValue(quantite);
       notification.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez choisir un article de confection dans la liste!',
      });
      this.useForm.patchValue({
        cout_fabrication: 0,
        prix_de_vente: 0,
        marge: 0,
      });
      return;
      }
    let total = 0;
    this.confections.controls.forEach((control) => {
      const quantite = control.get('quantite')?.value;
      const article = this.allData.confection.find((article) => article?.id == this.confections.controls[pos].get('article_id')?.value);
      if(article?.prix){
        total += quantite * article.prix;
      }
    });
    this.useForm.patchValue({
      cout_fabrication: total,
      prix_de_vente: total,
    });
  }
  marginCheck() {
    if (this.useForm.value.marge && this.useForm.value.cout_fabrication) {
      const marge = this.useForm.value.marge;
      const prix_de_vente = this.useForm.value.prix_de_vente ? +this.useForm.value.prix_de_vente : 0;
      const total = marge + prix_de_vente!;
      this.useForm.get('prix_de_vente')?.patchValue(total);
    }
  }
  promoCheck(event: any) {
    if (event.target.checked) {
      this.promo = false;
      this.useForm.get('promotion')?.setValidators([Validators.required, Validators.pattern(this.numberPattern)]);
    }else{
      this.promo = true;
      this.useForm.get('promotion')?.clearValidators();
    }
  }
  updateArticle(data: Partial<Vente>){
    this.updateArticleEvent.emit({...data});
  }
  renderEditedData(): void {
    this.confections.clear();
    if(this.updateData){
      this.useForm.patchValue({
        libelle: this.updateData.libelle,
        categorie_id: this.updateData.categorie_id,
        ref: this.updateData.ref,
        cout_fabrication: this.updateData.cout_fabrication,
        prix_de_vente: this.updateData.prix_de_vente,
        marge: this.updateData.marge,
        promoCheck: this.updateData.promoCheck,
        promotion: this.updateData.promotion,
        article: this.updateData.confections?.map((article):void => {
          this.confections.push(this.fb.group({
            libelle: [article.libelle, [Validators.required, Validators.pattern(this.libellePattern)]],
            quantite: [article.quantite, [Validators.required, Validators.pattern(this.numberPattern)]],
            article_id: [article.article_id, Validators.required],
          }));
        }
        )
      });
  }
}
resetForm(){
  this.useForm.patchValue({
    libelle: '',
    categorie_id: 0,
    ref: '',
    cout_fabrication: null,
    prix_de_vente: null,
    marge: null,
    promoCheck: false,
    promotion: null,
    confectionId: 0,
    article: []
  });
}
promoPricing(){
    let promoPrice:number = 0;
    this.useForm.value.prix_de_vente && this.useForm.value.promotion ? promoPrice = +this.useForm.value.prix_de_vente - +(this.useForm.value.prix_de_vente * this.useForm.value.promotion / 100) : promoPrice = 0;
    this.useForm.patchValue({
      prix_de_vente: promoPrice
    });
}
createVenteData(formData: any) {
  const venteData: Partial<Vente> = {
    libelle: formData.libelle || undefined,
    categorie_id: formData.categorie_id || undefined,
    ref: formData.ref || undefined,
    cout_fabrication: formData.cout_fabrication || undefined,
    prix_de_vente: formData.prix_de_vente || undefined,
    marge: formData.marge || undefined,
    promoCheck: formData.promoCheck || undefined,
    promotion: formData.promotion || undefined,
    article: this.confections.value,
  };

  return venteData;
}
removeInputField(i: number) {
  this.confections.removeAt(i);
  this.confectionsTable.splice(i, 1);
  this.articleIds.splice(i, 1);
}
}

