import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiURL = "https://localhost:44380/api/Brands/"; // Backend URL'iniz

  constructor(private httpClient: HttpClient) { }

  // Tüm markaları getir
  getAllBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiURL + "getAllBrands";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  // ID'ye göre marka getir
  getBrandById(id: number): Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiURL + "getBrandById?id=" + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

updateBrand(brand:any):Observable<ResponseModel>{
let newPath =this.apiURL+"updateBrand"

return this.httpClient.post<ResponseModel>(newPath,brand);
}

  // Yeni marka ekle
  addBrand(brand: any): Observable<ResponseModel> {
    let newPath = this.apiURL + "addBrand";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  // Markayı sil
  deleteBrand(id: number): Observable<ResponseModel> {
    let newPath = this.apiURL + "deleteBrand?id=" + id;
    return this.httpClient.post<ResponseModel>(newPath, null);
  }
}
