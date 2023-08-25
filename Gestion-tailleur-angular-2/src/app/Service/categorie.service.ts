import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/interfaces/categories';
import { Meta } from 'src/interfaces/meta';
import notification from 'sweetalert2';

@Injectable()
export class CategorieService {
  lastPage: number = 0;
  private response: any;
  constructor(private http: HttpClient) {}
  getCategories(page: number): Observable<Category[]> {
    return this.http
      .get<{ data: Category[],  meta:Meta}>(
        `http://127.0.0.1:8000/api/categories?page=${page}`
      )
      .pipe(
        tap((response: { data: Category[], meta: Meta}): void => {
          this.response = response;
          this.lastPage = response.meta.last_page;
          console.log(response.data);
        }),
        map((response: { data: Category[] }):Category[] => response.data),
        catchError((error): Observable<never[]> => {
          console.log(error);
          return of([]);
        })
      );
  }
  deleteCategories(ids: number[]): Observable<any> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    return this.http
      .post(
        `http://127.0.0.1:8000/api/categories/delete`,
        { categorieIds: ids },
        httpOptions
      )
      .pipe(
        tap((response: any): void => {
          console.log(response);
        }),
        catchError((responseError): Observable<never[]> => {
          console.log(responseError);
          return of([]);
        })
      );
  }
  addCategorie(libelle: string|null|undefined, type: string|undefined|null): Observable<Category|null> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    return this.http
      .post<Category>(
        `http://127.0.0.1:8000/api/categories`, { libelle, type }, httpOptions
      )
      .pipe(
        tap((response: Category): void => {
          console.log(response);
        }
        ),
        catchError((responseError): Observable<Category|null> => {
          console.log(responseError.error.message);
          notification.fire({
            title : 'Erreur',
            icon : 'error',
            text : responseError.error.message,
        });
          return of(null);
        }
        )
      );
  }
  editCategorie(libelle:string|null|undefined,id:number|undefined,type:string|undefined|null): Observable<Category|null> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    return this.http
      .put<Category>(`http://127.0.0.1:8000/api/categories/${id}`, { libelle, type}, httpOptions)
      .pipe(
        tap((response: Category): void => {
          console.log(response);
        }
        ),
        catchError((error): Observable<Category|null> => {
          console.log(error);
          return of(null);
        }
        )
      ); 
  }
  searchCategories(libelle: string|null|undefined): Observable<Category|null> {
    return this.http
      .get<Category>(
        `http://127.0.0.1:8000/api/categories/search/${libelle}`).pipe(
        tap((response: Category): void => {
          console.log(response);
        }
        ),
        catchError((error:string): Observable<Category|null> => {
          error = "Aucune catégorie trouvée"
          console.log(error);
          return of(null);
        }
        )
      );
  }
  hasNextPage(): boolean {
    return (
      this.response && this.response.links && this.response.links.next !== null
    );
  }
}
