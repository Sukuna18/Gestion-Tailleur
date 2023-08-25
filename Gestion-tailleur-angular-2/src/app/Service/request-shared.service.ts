import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from  '../shared/environement';
import { Injectable } from '@angular/core';
import notification from 'sweetalert2'
import { RestResponse } from 'src/interfaces/rest-response';
@Injectable({
  providedIn: 'root',
})

export abstract class RequestSharedService<T extends RestResponse<T>> {
  

  constructor(public http: HttpClient) { }

  abstract uri(): string;


  getAll() {
    return this.http.get(environment.api.baseUrl + `/${this.uri()}`).pipe(
      tap((response: any): void => {
        console.log(response);
      }),
      catchError(this.handleError)
    );
  }
  add(data: Partial<T>): Observable<T> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    return this.http.post<T>(environment.api.baseUrl + `/${this.uri()}`, data, httpOptions).pipe(
      tap((response: any): void => {
        console.log(response);
        notification.fire({
          title : 'Succès',
          icon : 'success',
          text : 'Données ajoutées avec succès',
      });

      }),
      catchError(this.handleError)
    );
  }
  delete(id: number): Observable<T> {
    return this.http.delete<T>(environment.api.baseUrl + `/${this.uri()}/${id}`).pipe(
      tap((response: any): void => {
        console.log(response);
      }),
      catchError(this.handleError)
    );
  }
  update(data: Partial<T>): Observable<T> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    
    return this.http.put<T>(environment.api.baseUrl + `/${this.uri()}/${data.id}`, data, httpOptions).pipe(
      tap((response: any): void => {
        console.log(response);
        notification.fire({
          title : 'Succès',
          icon : 'success',
          text : 'Données modifiées avec succès',
      });
      }),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
