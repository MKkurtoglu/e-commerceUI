import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Model } from '../models/model';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Mode } from 'fs';
import { ModelDto } from '../models/modelDto';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  apiURL= "https://localhost:44380/api/";
  
  constructor(private httpClient:HttpClient) { }
getModels():Observable<ListResponseModel<ModelDto>>{
  let newPath = this.apiURL+"Models/getAllModelsWithBrand";
  return this.httpClient.get<ListResponseModel<ModelDto>>(newPath);
}

  getModelsByBrand(brandId:number) :Observable<ListResponseModel<Model>> {
  let newPath = this.apiURL +"Models/getAllModelByBrand?brandId="+brandId;
  return  this.httpClient.get<ListResponseModel<Model>>(newPath)
    
  }

  getModelById(id: number): Observable<SingleResponseModel<Model>> {
    let newPath = this.apiURL + "Models/getModelById?id=" + id;
    return this.httpClient.get<SingleResponseModel<Model>>(newPath);
  }

  // Yeni model ekle
  addModel(model: any): Observable<ResponseModel> {
    let newPath = this.apiURL + "Models/addModel";
    return this.httpClient.post<ResponseModel>(newPath, model);
  }

  // Modeli güncelle
  updateModel(model: any): Observable<ResponseModel> {
    let newPath = this.apiURL + "Models/updateModel";
    return this.httpClient.post<ResponseModel>(newPath, model);
  }

  // Modeli sil
  deleteModel(id: number): Observable<ResponseModel> {
    let newPath = this.apiURL + "Models/deleteModel?id=" + id;
    return this.httpClient.post<ResponseModel>(newPath, {});
  }
}
