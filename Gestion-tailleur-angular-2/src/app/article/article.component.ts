import { Component, OnInit } from '@angular/core';
import { Article } from 'src/interfaces/article';
import { Category } from 'src/interfaces/categories';
import { Fournisseur } from 'src/interfaces/fournisseur';
import notification from 'sweetalert2';
import { ArticleService } from '../Service/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  categoriesList: Category[] = [];
  articlesList: Article[] = [];
  fournisseursList: Fournisseur[] = [];
  updatedData: Article | undefined;
  ngOnInit(): void {
    this.getAllData();
  }
  constructor(private articleService: ArticleService) {}

  addArticleParent(data: Partial<Article>): void {
    this.articleService.add(data).subscribe((article: any): void => {
      if (article && article.data) {
        this.articlesList.push(article.data);
      }
    });
  }
  getAllData(): void {
    this.articleService
      .getAll()
      .subscribe((response): void => {
        this.articlesList = response.articles;
        this.categoriesList = response.categories;
        this.fournisseursList = response.fournisseurs;
      }
      );
  }
  deleteArticle(id: number): void {
    this.articleService.delete(id).subscribe((response: any): void => {
      console.log(response);
      notification.fire({
        title: 'Succès',
        icon: 'success',
        text: 'Article supprimé avec succès',
      });
    });
    this.articlesList = this.articlesList.filter(
      (article: Article): boolean => article.id !== id
    );
  }
  updateArticle(article: Partial<Article>): void {
    this.articleService
      .update(article)
      .subscribe((response: any): void => {
        console.log(response);
        if (!response) {
          return;
        }

        const index = this.articlesList.findIndex(
          (a: Article): boolean => a.id === article.id
        );

        if (index !== -1) {
          const updatedArticle: Article = {
            ...this.articlesList[index],
            ...article,
          };
          this.articlesList[index] = updatedArticle;
        }
      });
  }
  getUpdatedArticle(data: Article): void {
    this.updatedData = data;
  }
}
