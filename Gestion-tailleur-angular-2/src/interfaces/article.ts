import { Fournisseur } from "./fournisseur";
import { RestResponse } from "./rest-response";

export interface Article extends RestResponse<Article> {
    prix: number|null|undefined;
    categorie_id: number|null;
    fournisseurs: number[];
    fournisseurs_name: Fournisseur[];
    stock: number|null|undefined;
    image: string | undefined;
    REF: string|null|undefined;
    categorie?: string;
}
