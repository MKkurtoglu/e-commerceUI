import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient :HttpClient) { }

  apiURL= "https://localhost:44380/api/";




  getUserProfile():Observable<SingleResponseModel<UserDto>>{
let newPath = this.apiURL +"Users/getProfileUser"
return this.httpClient.get<SingleResponseModel<UserDto>>(newPath)
  }
}
