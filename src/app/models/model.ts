import { Brand } from "./brand";

export interface Model{
    modelId:number;
    brandId:number;
    modelName:string;
    brand?:Brand;
    
}