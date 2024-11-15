import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable, retry } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL= "https://localhost:44380/api/";

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiURL + "Products/GetAll";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

getProducts2():Observable<ListResponseModel<Product>>{
  let newPath = this.apiURL+"Products/getProductsWithImages"
  return this.httpClient.get<ListResponseModel<Product>>(newPath);
}

getProduct(id:number):Observable<SingleResponseModel<Product>>{
  let newPath= this.apiURL+"Products/GetById?id="+id;
  return this.httpClient.get<SingleResponseModel<Product>>(newPath);
}

  getByCategory(categoryId: number): Observable<ListResponseModel<Product>> {
    let newPath = this.apiURL + "Products/GetByCategory?categoryId=" + categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

   add(product:Product):Observable<ResponseModel>{
    let newPath=this.apiURL+"Products/Add"
    return this.httpClient.post<ResponseModel>(newPath,product)
   }

   addProductImage(file:File,entityId:number,entityType:string):Observable<ResponseModel>{
    
let newPath = this.apiURL+"EntityImages/addImage"
const formData = new FormData();
formData.append('formFile', file);  // File'i form data'ya ekleyin
formData.append('entityId', entityId.toString());  // ID'yi string olarak ekleyin
formData.append('entityType', entityType);  // EntityType'i ekleyin

return this.httpClient.post<ResponseModel>(newPath, formData);
   }

deleteProduct(product:Product):Observable<ResponseModel>{
  
let newPath=this.apiURL+"Products/deleteProduct"
return this.httpClient.post<ResponseModel>(newPath,product)
}


updateProduct(product:Product):Observable<ResponseModel>{
let newPath = this.apiURL+"Products/updateProduct"
return this.httpClient.post<ResponseModel>(newPath,product);
}

   updateProductImage(file:File,imageId:number,entityType:string):Observable<ResponseModel>{
    let newPath = this.apiURL+"EntityImages/updateImage"
    const formData = new FormData();

    formData.append('formFile', file);  // File'i form data'ya ekleyin
formData.append('imageId', imageId.toString());  // ID'yi string olarak ekleyin
formData.append('entityType', entityType);  // EntityType'i ekleyin

return this.httpClient.post<ResponseModel>(newPath, formData);

   }

   deleteProductImage(imageId:number,entityType:string):Observable<ResponseModel>{
let newPath= this.apiURL+"EntityImages/deleteImage";

const params = {
  imageId: imageId.toString(),  // imageId'yi string olarak gönderiyoruz
  entityType: entityType        // entityType string olarak gönderiliyor
};

// HttpClient.post ile API'ye POST isteği yapıyoruz
return this.httpClient.post<ResponseModel>(newPath, {}, { params });
   }
}
