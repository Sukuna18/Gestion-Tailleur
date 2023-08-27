import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
export class FormulaireComponent {
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
  inputNumber: number = 1;
  btnSubmit: boolean = true;
  useForm = this.fb.group({
    libelle: ['', Validators.required],
    categorie_id: [0, Validators.required],
    ref: ['', Validators.required],
    cout_fabrication: [0, Validators.required],
    prix_de_vente: [0, Validators.required],
    image: ['', Validators.required],
    marge: [0, Validators.required],
    promoCheck: [false, Validators.required],
    promotion: [0, Validators.required],
    qte: [0, Validators.required],
    article_id: [0, Validators.required],
    articleConfection: ['', Validators.required],
  });  
  constructor(
    protected imageService: LoadImageService,
    private fb: FormBuilder
  ) {}
  addArticleVente() {
    const formData = this.useForm.value;    
    const venteData: Partial<Vente> = {
      libelle: formData.libelle || undefined,
      categorie_id: formData.categorie_id !== null ? formData.categorie_id : undefined,
      ref: formData.ref || undefined,
      cout_fabrication: formData.cout_fabrication !== null ? formData.cout_fabrication : undefined,
      prix_de_vente: formData.prix_de_vente !== null ? formData.prix_de_vente : undefined,
      image: formData.image || undefined,
      marge: formData.marge !== null ? formData.marge : undefined,
      promoCheck: formData.promoCheck !== null ? formData.promoCheck : undefined,
      promotion: formData.promotion !== null ? formData.promotion : undefined,
      articleConfection: formData.articleConfection !== null ? formData.articleConfection : undefined,
    };
    if(this.useForm.value.article_id === 0){
      notification.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez choisir un article',
      });
      return;
    }
    console.log(venteData);
    
    this.addArticleEvent.emit(venteData);
  }

  duplicateInputField(){
    this.inputNumber++;
  }
  searchArticle(event: any) {
    console.log(this.useForm.value.article_id);
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
          article_id: article?.id,
        });
        console.log(this.useForm.value.article_id);
        
      }
    });
  }
  quantityCheck(event: any) {
    this.btnSubmit = true;
    const value = event.target.value;
    //si article_id est null ou == 0 
    this.allData.confection.forEach((article) => {
      if (article?.id === this.useForm.value.article_id) {
        article?.stock && article?.stock < value ? this.btnSubmit = true : this.btnSubmit = false;
 
      }
    }
    );

  }
}
