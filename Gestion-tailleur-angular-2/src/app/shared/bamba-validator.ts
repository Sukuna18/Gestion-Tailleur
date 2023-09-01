import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { sontTableauxIdentiques } from './utils';

export class BambaValidator {
  static validateArticles(confectionsTable: string[], articleIds: number[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!confectionsTable.includes('tissu') || !confectionsTable.includes('fil') || !confectionsTable.includes('bouton') || confectionsTable.length < 3 || articleIds.length < 3) {
        return { bambaArticles: true, message: 'Les articles doivent contenir au moins un tissu, un fil et un bouton.' };
      }
      
      if (!sontTableauxIdentiques(control.value.map((item: any) => item.confection), confectionsTable)) {
        return { bambaArticles: true, message: 'Veuillez ne pas dupliquer les articles.' };
      }
      
      const libelleExists = control.value.some((item: any) => item.libelle === control.parent?.get('libelle')?.value);
      if (libelleExists) {
        return { bambaArticles: true, message: 'Cet article existe déjà.' };
      }
      
      return null;
    };
  }
}
