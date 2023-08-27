import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class FormulaireComponent implements OnInit {
  @Output() addArticleEvent: EventEmitter<Partial<Vente>> = new EventEmitter<Partial<Vente>>();
  @Input() allData: {
    articles: Partial<Vente[]>;
    categories: Partial<Category[]>;
    confection: Partial<Article[]>;
  } = {
    articles: [],
    categories: [],
    confection: [],
  };
  categorieName: string = '';
  promo: boolean = true;
  inputNumber: number = 1;
  btnSubmit: boolean = true;
  libellePattern = '^[a-zA-Z]{3,30}$';
  numberPattern = '^[0-9]*$';
  useForm = this.fb.group({
    libelle: ['', [Validators.required, Validators.pattern(this.libellePattern)]],
    categorie_id: [0, Validators.required],
    ref: ['', Validators.required],
    cout_fabrication: [null, [Validators.required, Validators.pattern(this.numberPattern)]],
    prix_de_vente: [null, [Validators.required, Validators.pattern(this.numberPattern)]],
    marge: [null, [Validators.required, Validators.pattern(this.numberPattern)]],
    promoCheck: [false, Validators.required],
    promotion: [null, [Validators.required, Validators.pattern(this.numberPattern)]],
    qte: [null, [Validators.required, Validators.pattern(this.numberPattern)]],
    confectionId: [0, Validators.required],
    article_id: this.fb.array([])
  });  
  constructor(
    protected imageService: LoadImageService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}
  get confections():FormArray<any>{
    return this.useForm.get('article_id') as FormArray
  }
  addArticleVente() {
    if(this.useForm.value.confectionId === 0){
      notification.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez choisir une categorie!',
      });
      return;
    }
    if(this.inputNumber < 3){
      notification.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez ajouter au moins 3 articles!',
      });
      return;
    }
    const formData = this.useForm.value;    
    if(!this.confections.value.includes(formData.confectionId)){
      this.confections.push(this.fb.control(formData.confectionId));
    }
    const venteData: Partial<Vente> = {
      libelle: formData.libelle || undefined,
      categorie_id: formData.categorie_id !== null ? formData.categorie_id : undefined,
      ref: formData.ref || undefined,
      cout_fabrication: formData.cout_fabrication !== null ? formData.cout_fabrication : undefined,
      prix_de_vente: formData.prix_de_vente !== null ? formData.prix_de_vente : undefined,
      marge: formData.marge !== null ? formData.marge : undefined,
      promoCheck: formData.promoCheck !== null ? formData.promoCheck : undefined,
      promotion: formData.promotion !== null ? formData.promotion : undefined,
      article_id: this.confections.value,
    };
    console.log(venteData);
    
    this.addArticleEvent.emit({...venteData, image: this.imageService.thumbnail});
  }

  duplicateInputField() {
    this.inputNumber++;
    const articleId = this.useForm.get('confectionId')?.value;
    if(!this.confections.value.includes(articleId)){
      this.confections.push(this.fb.control(articleId));
    }
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
  searchArticle(event: any) {
    console.log(this.useForm.value.categorie_id);
    const value = event.target.value;
      this.btnSubmit = this.allData.articles.some((article) => {
        return article?.libelle === value || value.length < 3;
      }
      );
  }
  searchConfection(event: any) {
    this.btnSubmit = true;
    console.log(this.allData.confection);
    const value = event.target.value;
    this.allData.confection.forEach((article) => {
      if (article?.libelle === value) {
        console.log('ok');
        this.btnSubmit = false;
        this.useForm.patchValue({
          confectionId: article?.id,
        });
        console.log(this.useForm.value.confectionId);
        
      }
    });
  }
  quantityCheck(event: any) {
    this.btnSubmit = true;
    const value = event.target.value;
    this.allData.confection.forEach((article) => {
      if (article?.id === this.useForm.value.confectionId) {
        article?.stock && article?.stock < value ? this.btnSubmit = true : this.btnSubmit = false;
      }
    }
    );
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

}
