import { Injectable } from '@angular/core';
import { RequestSharedService } from './request-shared.service';
import { RestResponse } from 'src/interfaces/rest-response';
import { Vente } from 'src/interfaces/vente';

@Injectable({
  providedIn: 'root'
})
export class ArticleVenteService extends RequestSharedService<RestResponse<Partial<Vente>>>  {

  override uri(): string {
    return 'ventes';
  }
}
