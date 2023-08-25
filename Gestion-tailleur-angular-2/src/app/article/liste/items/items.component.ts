import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/interfaces/article';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  buttonTextStates: { [key: number]: string } = {};
  updatedArticle: Article | undefined;
  @Input() articlesList: Article[] = [];
  buttonText: string = 'Supprimer';
  selectedArticleId: number | undefined;
  isLoading:boolean = true; 
  @Output() deleteArticleEvent: EventEmitter<any> = new EventEmitter();
  @Output() updateArticleForm: EventEmitter<any> = new EventEmitter();
  currentPage: number = 1; 
  itemsPerPage: number = 10; 

  constructor() {}

  ngOnInit(): void {
    setTimeout(():void => {
      this.isLoading = false; 
    }, 3000);
  }

  
  deleteArticle(id: number | undefined): void {
    this.deleteArticleEvent.emit(id);
  }
  
  toggleButtonText(selectedId: number): void {
    const article = this.articlesList.find((a:Article):boolean => a.id === selectedId);
    if (!article) {
      return;
    }
    const currentState = this.buttonTextStates[selectedId] || 'Supprimer';
    if (currentState === 'Supprimer') {
      this.buttonTextStates[selectedId] = 'OK(3)';
      let count = 3;
      const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
          this.buttonTextStates[selectedId] = `OK(${count})`;
        } else {
          this.buttonTextStates[selectedId] = 'Supprimer';
          clearInterval(countdownInterval);
        }
      }, 1000);
    } else if (currentState.startsWith('OK')) {
      this.deleteArticle(selectedId);
      this.articlesList = this.articlesList.filter((a:Article):Boolean => a.id !== selectedId);
      this.buttonTextStates[selectedId] = 'Supprimer';
    }
  }
  getArticle(id: number): void {
    this.selectedArticleId = id;
    this.updatedArticle = this.articlesList.find((a:Article):boolean => a.id === id); 
    this.updateArticle(this.updatedArticle);
    this.updatedArticle = undefined;
  }
  updateArticle(data:Article|undefined): void {
    this.updateArticleForm.emit(data);
  }
  get totalPages(): number {
    return Math.ceil(this.articlesList.length / this.itemsPerPage);
  }
  
  changePage(offset: number): void {
    const newPage = this.currentPage + offset;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }
  get paginatedArticles(): Article[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.articlesList.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
