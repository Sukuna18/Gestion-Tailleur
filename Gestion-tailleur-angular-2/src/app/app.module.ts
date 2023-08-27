import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleComponent } from './article/article.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorieService } from './Service/categorie.service';
import { FormComponent } from './article/form/form.component';
import { ListeComponent } from './article/liste/liste.component';
import { ItemsComponent } from './article/liste/items/items.component';
import { ArticleVenteComponent } from './article-vente/article-vente.component';
import { FormulaireComponent } from './article-vente/formulaire/formulaire.component';
import { ListeVenteComponent } from './article-vente/liste-vente/liste-vente.component';
import { PaginationComponent } from './UI/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    PageNotFoundComponent,
    ArticleComponent,
    FormComponent,
    ListeComponent,
    ItemsComponent,
    ArticleVenteComponent,
    FormulaireComponent,
    ListeVenteComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CategorieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
