import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CategoryDto } from '../models/categoryDto';
import { CategoryWithCount } from '../models/categoryWithCount';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiURL= "https://localhost:44380/api/";

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<ListResponseModel<CategoryWithCount>> {
    let newPath = this.apiURL + "Categories/GetAll";
    return this.httpClient.get<ListResponseModel<CategoryWithCount>>(newPath);
  }

getAllCategoriesDto(): Observable<ListResponseModel<CategoryDto>>{
  let newPath = this.apiURL + "Categories/GetAll";
  return this.httpClient.get<ListResponseModel<CategoryDto>>(newPath);
}

getCategoryDto(id: number): Observable<SingleResponseModel<CategoryDto>>{
  let newPath = this.apiURL + "Categories/getCategoryById?id=" + id;
  return this.httpClient.get<SingleResponseModel<CategoryDto>>(newPath);
}
  getCategoryById(id: number): Observable<SingleResponseModel<Category>> {
    let newPath = this.apiURL + "Categories/getCategoryById?id=" + id;
    return this.httpClient.get<SingleResponseModel<Category>>(newPath);
  }

  addCategory(category: any): Observable<ResponseModel> {
    let newPath = this.apiURL + "Categories/addCategory";
    return this.httpClient.post<ResponseModel>(newPath, category);
  }

  updateCategory(category: any): Observable<ResponseModel> {
    let newPath = this.apiURL + "Categories/updateCategory";
    return this.httpClient.post<ResponseModel>(newPath, category);
  }

  deleteCategory(id: number): Observable<ResponseModel> {
    let newPath = this.apiURL + "Categories/deleteCategory?id=" + id;
    return this.httpClient.post<ResponseModel>(newPath, null);
  }

  addCategoryImage(file: File, entityId: number): Observable<ResponseModel> {
    const newPath = this.apiURL + "EntityImages/addImage";
    const formData = new FormData();
    formData.append('formFile', file);
    formData.append('entityId', entityId.toString());
    formData.append('entityType', 'category');
    
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }
  deleteCategoryImage(imageId:number,entityType:string):Observable<ResponseModel>{
    let newPath= this.apiURL+"EntityImages/deleteImage";
    
    const params = {
      imageId: imageId.toString(),  // imageId'yi string olarak gönderiyoruz
      entityType: entityType        // entityType string olarak gönderiliyor
    };
    
    // HttpClient.post ile API'ye POST isteği yapıyoruz
    return this.httpClient.post<ResponseModel>(newPath, {}, { params });
       }
  updateCategoryImage(file: File, imageId: number): Observable<ResponseModel> {
    const newPath = this.apiURL + "EntityImages/updateImage";
    const formData = new FormData();
    formData.append('formFile', file);
    formData.append('imageId', imageId.toString());
    formData.append('entityType', 'category');
    
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }

}
