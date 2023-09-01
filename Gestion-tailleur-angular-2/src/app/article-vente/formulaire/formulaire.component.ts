import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { LoadImageService } from 'src/app/Service/load-image.service';
import { BambaValidator } from 'src/app/shared/bamba-validator';
import { sontTableauxIdentiques } from 'src/app/shared/utils';
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
  categorieArticleIds:number[] = [];
  position:number = 0;
  categorieName: string = '';
  promo: boolean = true;
  total: number = 0;
  btnSubmit: boolean = true;
  libellePattern:string =  '^[a-zA-Z0-9 ]*$';
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
    article: this.fb.array([], [BambaValidator.validateArticles(this.confectionsTable, this.categorieArticleIds)])
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
    const errors = BambaValidator.validateArticles(this.confectionsTable, this.categorieArticleIds)(this.confections);

    if (errors) {
    const errorMessage = errors['message'];
    notification.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
    });
    return;
  }
    
    if(Object.keys(this.updateData).length == 0 ){
        if(this.useForm.invalid || this.confections.invalid){
          notification.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Veuillez remplir tous les champs!',
          });
          return;
        }
      console.log(venteData);
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
        quantite: [0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
        article_id: [0, Validators.required],
        confection: [0, Validators.required],
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
    this.useForm.get('ref')?.patchValue(`REF-${lib?.toUpperCase()}-${this.categorieName}-${result?.count ?? 0}`);
  }
  selectConfection(e:Event) {
    const inputElement = e?.target as HTMLInputElement;
    const confectionId = inputElement?.value;
    console.log(confectionId);
    
    let result =  this.allData.confection.find((article):boolean => article?.id == +confectionId);
    if(result && (!this.categorieArticleIds.includes(result.id)|| !this.confectionsTable.includes(result.libelle))){     
      this.categorieArticleIds.push(result.id);
      this.confectionsTable.push(result.categorie);
      this.confections.controls[this.position].get('libelle')?.patchValue(result.libelle);
      this.confections.controls[this.position].get('article_id')?.patchValue(result.id);
      this.confections.controls[this.position].get('confection')?.patchValue(result.categorie);
      console.log(this.confections.controls[this.position].value);
      
    }
    this.searchResult = [];
  }
  searchConfection(event: Event,pos: number) {
    this.confections.controls[pos].get('quantite')?.patchValue(0);
    this.position = pos;
    const value = (event.target as HTMLInputElement).value;
    this.searchResult = this.allData.confection.filter((article): boolean => {
      if(article?.id && value === article?.libelle && !this.categorieArticleIds.includes(article?.id)){
        this.confections.controls[pos].patchValue({
          libelle: article?.libelle,
          article_id: article?.id,
          confection: article?.categorie
        });
        this.categorieArticleIds.push(article?.id);
        this.confectionsTable.push(article.categorie);
        console.log(this.confections.controls[pos].value);
      }
      return article?.libelle.toLowerCase().search(value.toLowerCase()) !== -1;
    });
  }
  quantityCheck(pos:number):void {
    const quantite = this.confections.controls[pos].get('quantite')?.value;
    const libelle = this.confections.controls[pos].get('libelle')?.value;
    const article = this.allData.confection.find((article) => article?.id == this.confections.controls[pos].get('article_id')?.value);
    if((quantite.value == '' ||  libelle.value == '')  && this.useForm.value.cout_fabrication && this.useForm.value.prix_de_vente && article?.prix){
      this.useForm.patchValue({
        cout_fabrication: this.useForm.value.cout_fabrication - this.confections.controls[pos].get('quantite')?.value * article?.prix,
        prix_de_vente: this.useForm.value.prix_de_vente - this.confections.controls[pos].get('quantite')?.value * article?.prix ,
      });
    }
      let total = this.useForm.value.cout_fabrication ?? 0;
      let categorie = this.allData.confection.find((article) => article?.id == this.confections.controls[pos].get('article_id')?.value)?.categorie;
      if(categorie && !this.confectionsTable.includes(categorie) || this.confections.controls[pos].get('libelle')?.value == ''){
        console.log(this.confectionsTable);
        
       notification.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez choisir un article de confection dans la liste!',
      });
      this.confections.controls[pos].get('quantite')?.patchValue(0);
      return;
      }
      
      if(article?.prix){
        total! += quantite * article.prix;
        this.useForm.patchValue({
          cout_fabrication: total,
          prix_de_vente: total,
        });
      }
  }
  marginCheck() {
    if(this.useForm.value.cout_fabrication && this.useForm.value.marge){      
      const cout_fabrication = this.useForm.value.cout_fabrication;
      if(this.useForm.value.marge < 5000 || this.useForm.value.marge > cout_fabrication / 3){
        notification.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La marge doit etre comprise entre 5000 et 1/3 du cout de fabrication!',
        });
        this.useForm.get('marge')?.patchValue(0);
        return;
      }else{
        this.useForm.patchValue({
          prix_de_vente: +this.useForm.value.cout_fabrication + +this.useForm.value.marge,
        });
      }
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
  let article = this.allData.confection.find((article) => article?.id == this.confections.controls[i].get('article_id')?.value);
  if(this.useForm.value.cout_fabrication && article?.prix){
    this.useForm.patchValue({
      cout_fabrication: this.useForm.value.cout_fabrication - this.confections.controls[i].get('quantite')?.value * article?.prix,
      prix_de_vente: this.useForm.value.cout_fabrication - this.confections.controls[i].get('quantite')?.value * article?.prix,
    });
  }  
  this.confections.removeAt(i);
  this.confectionsTable.splice(i, 1);
  this.categorieArticleIds.splice(i, 1);
}
}

