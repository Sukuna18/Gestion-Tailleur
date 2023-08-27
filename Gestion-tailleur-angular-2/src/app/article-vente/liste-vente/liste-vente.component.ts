import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/interfaces/article';
import { Category } from 'src/interfaces/categories';
import { Vente } from 'src/interfaces/vente';

@Component({
  selector: '[app-liste-vente]',
  templateUrl: './liste-vente.component.html',
  styleUrls: ['./liste-vente.component.css']
})
export class ListeVenteComponent implements OnInit {
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
}
