import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient :HttpClient) { }

  apiURL= "https://localhost:44380/api/";


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiURL+"Auth/register"
   return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel)
  }
}
