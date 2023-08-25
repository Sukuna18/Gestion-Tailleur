import { Component, OnInit } from '@angular/core';
import { Category } from 'src/interfaces/categories';
import { CategorieService } from '../Service/categorie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import notification from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  isToggleChecked: boolean = false;
  categoriesList: Category[] = [];
  currentPage: number = 1;
  hasNextPage: boolean = false;
  selectedCategoryIds: number[] = [];
  categorieId: number | undefined;
  buttonState: boolean = true;
  libelleCheck: boolean = false;
  totalPage: number = 0;
  useForm = new FormGroup({
    libelle: new FormControl('',[Validators.required, Validators.minLength(3)]),
    type: new FormControl(''),
  })
  constructor(private categorieService: CategorieService) {}
  ngOnInit(): void {
    this.loadCategories(this.currentPage);
  }

  changeCheked(): void {
    this.libelleCheck = !this.libelleCheck;

    if (this.libelleCheck == true) {
      this.selectedCategoryIds = this.categoriesList.map(
        (categorie) => categorie.id
      );
    } else {
      this.selectedCategoryIds = [];
    }
  }
  goToPage(page: number) {
    this.loadCategories(page);
  }

  getCategorieId(id: number): void {
    if (this.isToggleChecked === true) {
      
      this.categorieId = id;
      this.useForm.get('libelle')?.patchValue(
        this.categoriesList.find(
          (categorie: Category): boolean => categorie.id === id
        )?.libelle || '');
      console.log(this.categorieId);
    }
  }

  selectCategory(id: number): void {
    if (this.selectedCategoryIds.includes(id)) {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(
        (selectedId: number): boolean => selectedId !== id
      );
      console.log(this.selectedCategoryIds);
    } else {
      this.selectedCategoryIds.push(id);
      console.log(this.selectedCategoryIds);
    }
  }
  addCategory(): void {
    console.log(this.useForm.value.type);
    
    if(!this.useForm.value.type){
      notification.fire({
        title : 'Erreur',
        icon : 'error',
        text : 'Veuillez choisir un type',
    });
        return;  
    }
    if (this.useForm.value.libelle && this.useForm.value.type) {
      if(this.useForm.value.libelle.length < 3){
        this.buttonState = true;
        return;
      }
    }
    if (this.isToggleChecked === false) {
      this.categorieService
        .addCategorie(this.useForm.value.libelle, this.useForm.value.type)
        .subscribe((response: Category | null): void => {
          console.log(response);
          this.loadCategories(this.currentPage);
          this.useForm.get('libelle')?.patchValue('');
        });
    } else {
      console.log(this.categorieId);
      this.categorieService
        .editCategorie(this.useForm.value.libelle, this.categorieId, this.useForm.value.type)
        .subscribe((response: Category | null): void => {
          console.log(response);
          this.loadCategories(this.currentPage);
          this.useForm.get('libelle')?.patchValue('');
        });
    }
  }
  loadCategories(page: number): void {
    this.categorieService
      .getCategories(page)
      .subscribe((categoriesList: Category[]): void => {
        this.categoriesList = categoriesList;
        this.totalPage = this.categorieService.lastPage;
        this.hasNextPage = this.categorieService.hasNextPage();
      });
  }
  deleteSelectedCategories(): void {
    if (this.selectedCategoryIds.length > 0) {
      this.categorieService
        .deleteCategories(this.selectedCategoryIds)
        .subscribe((response: any): void => {
          console.log(response);
          this.loadCategories(this.currentPage);
          this.selectedCategoryIds = [];
        });
    }
  }
  search(): void {
    this.categorieService
      .searchCategories(this.useForm.value.libelle)
      .subscribe((categorie: Category | null): void => {
        if(this.useForm.value.libelle){
        if (this.isToggleChecked === false) {
            categorie || this.useForm.value.libelle.length < 3 ? this.buttonState = true : this.buttonState = false;
          }
          else{
            !categorie && this.useForm.value.libelle.length > 3 ? this.buttonState = false : this.buttonState = true;
          }
        }
      });
  }
  nextPage(): void {
    this.currentPage++;
    this.loadCategories(this.currentPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCategories(this.currentPage);
    }
  }
  handleToggle(e: Event): void {
    this.buttonState = true;
    const target = e.target as HTMLInputElement;
    this.isToggleChecked = target.checked;
    console.log(this.isToggleChecked);
  }
}
