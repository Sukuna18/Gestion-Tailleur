import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/interfaces/article';
import { Category } from 'src/interfaces/categories';
import { Vente } from 'src/interfaces/vente';

@Component({
  selector: '[app-liste-vente]',
  templateUrl: './liste-vente.component.html',
  styleUrls: ['./liste-vente.component.css']
})
export class ListeVenteComponent implements OnInit {
  upatedVente: Vente | undefined;
  @Output() updateArticleForm: EventEmitter<Partial<Vente>> = new EventEmitter<Partial<Vente>>();
@Input() allData: {
  articles: Partial<Vente[]>;
  categories: Partial<Category[]>;
  confection: Partial<Article[]>;
} = {
  articles: [],
  categories: [],
  confection: []
};
@Input() article: Vente | undefined;
ngOnInit(): void {
  
}
editArticle(id: number|undefined): void {
  this.upatedVente = this.allData.articles.find((a:Vente|undefined):boolean => a?.id === id);
  this.updateArticle(this.upatedVente);
}
updateArticle(data:Vente|undefined): void {
  this.updateArticleForm.emit(data);
}
}
