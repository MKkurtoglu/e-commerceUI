import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { AboutUs } from '../models/aboutUs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class CorporateService {

  constructor(private httpClient:HttpClient) { }

  apiURL= "https://localhost:44380/api/";


  getAboutUs():Observable<AboutUs>{
    let newPath = this.apiURL+"Corporate/about"

    return this.httpClient.get<AboutUs>(newPath);
  }


  getContact():Observable<Contact>{
    let newPath = this.apiURL+"Corporate/contact"

    return this.httpClient.get<Contact>(newPath);
  }
}
