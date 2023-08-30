import { Component, OnInit } from '@angular/core';
import { ArticleVenteService } from '../Service/article-vente.service';
import { Vente } from 'src/interfaces/vente';
import { Category } from 'src/interfaces/categories';
import { Article } from 'src/interfaces/article';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-vente',
  templateUrl: './article-vente.component.html',
  styleUrls: ['./article-vente.component.css'],
})
export class ArticleVenteComponent implements OnInit {
  updateData: Partial<Vente> = {};
  currentPage: number = 1; 
  itemsPerPage: number = 2; 
  allData: {
    articles: Partial<Vente[]>;
    categories: Partial<Category[]>;
    confection: Partial<Article[]>;
  } = {
    articles: [],
    categories: [],
    confection: []
  };

  ngOnInit(): void {
    this.getAll();
  }

  constructor(private venteService: ArticleVenteService) {}
  getAll() {
    this.venteService.getAll().subscribe((data) => {
      this.allData = data;
    });
  }
  addArticleVente(data: Partial<Vente>) {
    this.venteService.add(data).subscribe();
    //@ts-ignore
    this.allData.articles.push(data);
  }
  updateArticleVente(data: Partial<Vente>) {
    this.venteService.update(data).subscribe();
  }
  get totalPages(): number {
    return Math.ceil(this.allData.articles.length / this.itemsPerPage);
  }
  
  changePage(offset: number): void {
    const newPage = this.currentPage + offset;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }
  updateArticle(data: Partial<Vente>) {
    this.updateData = data;
  }
  deleteArticle(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.venteService.delete(id).subscribe();
        this.allData.articles = this.allData.articles.filter((a:Vente|undefined):boolean => a?.id !== id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Suppression annulée', '', 'info');
        return;
      }
    })
  }




























  
  get paginatedArticles(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.allData.articles.slice(startIndex, startIndex + this.itemsPerPage);
  }
  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
}
