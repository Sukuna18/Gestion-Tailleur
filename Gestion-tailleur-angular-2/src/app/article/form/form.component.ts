import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadImageService } from 'src/app/Service/load-image.service';
import { Article } from 'src/interfaces/article';
import { Category } from 'src/interfaces/categories';
import { FormElement } from 'src/interfaces/formElement';
import { Fournisseur } from 'src/interfaces/fournisseur';
import notification from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges{
  @Input() categoriesList: Category[] = [];
  @Input() updatedData: Article | undefined;
  @Output() addArticleEvent: EventEmitter<Partial<Article>> = new EventEmitter<Partial<Article>>();
  @Output() editArticleEvent: EventEmitter<Partial<Article>> = new EventEmitter<Partial<Article>>();
  namePattern: string = '^[a-zA-Z0-9_-]{3,15}$';
  prixPattern: string = '^[0-9]{1,10}$';
  isEdit: boolean = false;
  fournisseurs: number[] = [];
  @Input() fournisseurList: Fournisseur[] = [];
  idFournisseur: number | undefined;
  searchResults: any[] = [];
  nomFournisseurs: string[] = [];
  categorieName: string = '';
  useForm:FormGroup<FormElement> = new FormGroup({
    libelle : new FormControl('',[Validators.required, Validators.pattern(this.namePattern)]),
    prix : new FormControl('',[Validators.required, Validators.pattern(this.prixPattern)]),
    stock : new FormControl('',[Validators.required, Validators.pattern(this.prixPattern)]),
    fournisseursInput: new FormControl('',[Validators.required]),
    REF: new FormControl(''),
    categorie_id: new FormControl('',[Validators.required]),
    photo: new FormControl('',[Validators.required]),
  })
  constructor(public imageService: LoadImageService){}
    ngOnInit(): void {}
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['updatedData'] && this.updatedData) {
        this.renderEditedData();
        console.log(this.updatedData);
      }
    }
  
  addArticle(): void {
    
      if (this.fournisseurs.length == 0){
        notification.fire({
          title : 'Erreur',
          icon : 'error',
          text : 'Veuillez choisir un fournisseur',
      });
      return;
      }
      if(this.useForm.value.categorie_id == ''){
        notification.fire({
          title : 'Erreur',
          icon : 'error',
          text : 'Veuillez choisir une catégorie',
      });
        return;
      }
      if (this.useForm.value.prix && this.useForm.value.stock && this.useForm.value.categorie_id) {
        const fournisseurs = this.fournisseurs;
        this.addArticleEvent.emit({...this.useForm.value,fournisseurs});
    }
    this.nomFournisseurs = [];
    this.fournisseurs = [];
    this.imageService.thumbnail = this.imageService.defaultUrl;
    this.resetForm();
  }
  refInput(e?: Event):void {
    const inputElement = e?.target as HTMLInputElement;
    const categorieId = inputElement?.value;
    let result =  this.categoriesList.find((categorie:Category):boolean => categorie.id == +categorieId);
    if(result){
      this.categorieName = result.libelle.toLocaleUpperCase();
    }
    const lib = this.useForm.value.libelle?.substring(0,3);
    this.useForm.get('REF')?.patchValue(`REF-${lib?.toUpperCase()}-${this.categorieName}-${result?.count}`);
  }


  selectFournisseur(fournisseurId: number, nom: string, e: Event): void {
    if (!this.nomFournisseurs.includes(nom)) {
      this.nomFournisseurs.push(nom);
      this.fournisseurs.push(fournisseurId);
      this.searchResults = []
      console.log(this.fournisseurs);
      this.useForm.get('fournisseursInput')?.patchValue('');
      const spanElement = e.target as HTMLSpanElement;
      spanElement.innerHTML = '';
    }
    console.log(this.nomFournisseurs);
  }

  removeFournisseur(fournisseur: string): void {
    this.nomFournisseurs = this.nomFournisseurs.filter(
      (nom: string): boolean => {
        return nom !== fournisseur;
      }
    );
    this.fournisseurs.forEach((fournisseurId: number): void => {
      this.idFournisseur = fournisseurId;
      console.log(this.idFournisseur);
    });
    this.fournisseurs = this.fournisseurs.filter(
      (fournisseurId: number): boolean => {
        return fournisseurId !== this.idFournisseur;
      }
    );
    console.log(this.fournisseurs);
  }


  searchFournisseur(e:Event): void {
    const inputElement = e.target as HTMLInputElement;
    const query = inputElement.value;
    this.searchResults = this.fournisseurList.filter((fournisseur: Fournisseur): boolean => {
      return fournisseur.nom.toLowerCase().search(query.toLowerCase()) !== -1 && !this.fournisseurs.includes(fournisseur.id);
    }
    );
  }
  renderEditedData(): void {
    this.isEdit = true;
    if(this.updatedData){
      this.useForm.patchValue({
        libelle: this.updatedData.libelle,
        prix: this.updatedData.prix,
        stock: this.updatedData.stock,
        REF: this.updatedData.REF,
      });
      this.nomFournisseurs = this.updatedData.fournisseurs_name.map((fournisseur: Fournisseur): string => {
        return fournisseur.nom;
      }
      );
      this.fournisseurs = this.updatedData.fournisseurs_name.map((fournisseur: Fournisseur): number => {
        return fournisseur.id;
      }
      );
    }
  }
  editArticle():void{
    if(this.useForm.value.categorie_id == ''){
      notification.fire({
        title : 'Erreur',
        icon : 'error',
        text : 'Veuillez choisir une catégorie',
    });
      return;
    }
    if(this.fournisseurs.length == 0){
      notification.fire({
        title : 'Erreur',
        icon : 'error',
        text : 'Veuillez choisir un fournisseur',
    });
    return;
    }
    if (this.useForm.value.prix && this.useForm.value.stock && this.useForm.value.categorie_id) {
      const fournisseurs = this.fournisseurs;
      this.editArticleEvent.emit({...this.useForm.value,fournisseurs,id:this.updatedData?.id});
  }
  this.isEdit = false;
  this.nomFournisseurs = [];
  this.fournisseurs = [];
  this.imageService.thumbnail = this.imageService.defaultUrl;
  this.resetForm();
}
  resetForm():void{
    this.useForm.patchValue({
      libelle: '',
      prix: '',
      stock: '',
      REF: '',
      categorie_id: '',
      fournisseursInput: '',
      photo: '',
    });
  }
}
