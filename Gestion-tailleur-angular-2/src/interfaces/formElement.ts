import { FormControl } from "@angular/forms";

export interface FormElement {
    libelle: FormControl;
    prix: FormControl;
    stock: FormControl;
    fournisseursInput: FormControl;
    REF: FormControl;
    categorie_id: FormControl;
    photo: FormControl;
}