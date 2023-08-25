import { RestResponse } from "./rest-response";

export interface Fournisseur extends RestResponse<Fournisseur> {
    nom: string;
}
