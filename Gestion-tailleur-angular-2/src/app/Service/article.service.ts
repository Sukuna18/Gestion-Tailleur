import { Injectable } from '@angular/core';
import { Article } from 'src/interfaces/article';
import { RequestSharedService } from './request-shared.service';
import { RestResponse } from 'src/interfaces/rest-response';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends RequestSharedService<RestResponse<Article>> {
 override uri(): string {
   return 'articles';
 }

}
