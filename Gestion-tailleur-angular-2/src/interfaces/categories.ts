import { RestResponse } from "./rest-response";

export interface Category extends RestResponse<Category>{
    count: number;
}