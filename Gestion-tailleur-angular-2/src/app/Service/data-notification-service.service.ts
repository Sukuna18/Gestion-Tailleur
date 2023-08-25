import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataNotificationService {
  private dataAvailableSubject = new Subject<void>();

  onDataAvailable() {
    this.dataAvailableSubject.next();
  }

  onDataAvailable$ = this.dataAvailableSubject.asObservable();
}


// ngOnInit(): void {
//   this.dataNotificationService.onDataAvailable$.subscribe(() => {
//     console.log('Données disponibles !');
//     // Exécuter le code dépendant des données ici
//   });

 // Émettre l'événement de disponibilité des données
//  this.dataNotificationService.onDataAvailable();