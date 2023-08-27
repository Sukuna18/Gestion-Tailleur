import { Article } from "./article";
import { RestResponse } from "./rest-response";

export interface Vente extends RestResponse<Vente>{
    categorie_id: number;
    ref: string;
    cout_fabrication: number;
    prix_de_vente: number;
    image: string;
    marge: number;
    promoCheck: boolean;
    promotion: number;
    confection: Article[];
    article_id: number;
    articleConfection: string;
    links:Object;
}