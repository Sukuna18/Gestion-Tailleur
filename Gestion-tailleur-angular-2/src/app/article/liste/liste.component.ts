import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/interfaces/article';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeComponent implements OnInit {
  updatedArticle: Article = {} as Article;
  @Input() articlesList: Article[] = [];
  @Output() deleteArticleEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateArticleForm: EventEmitter<Article> = new EventEmitter<Article>();
  constructor() {}

  ngOnInit(): void {
  }
  deleteArticle(id:number): void {
    this.deleteArticleEvent.emit(id);
  }
  updateArticle(data:Article): void {
    this.updateArticleForm.emit(data);
  }
  
}
