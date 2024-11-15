import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ProfileImage } from '../models/profile-image';
import { Observable, retry } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  constructor(private httpClient :HttpClient,private toastrService:ToastrService) { }

  apiURL= "https://localhost:44380/api/";
  getImageUrl():Observable<SingleResponseModel<ProfileImage>>{
let newPath = this.apiURL+"ProfileImage/getProfileImage"

return this.httpClient.get<SingleResponseModel<ProfileImage>>(newPath);
  }


  addProfileImage(file: File){
    let newPath = this.apiURL+"ProfileImage/addProfileImage"
    const formData: FormData = new FormData();
  formData.append('file', file, file.name); 
    return this.httpClient.post<ResponseModel>(newPath,formData);
  }

  updateProfileImage(file: File, id: number) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('id', id.toString());
  
    const newPath = this.apiURL + "ProfileImage/updateProfileImage";
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }


deleteprofileImage(){
let newPath = this.apiURL+"ProfileImage/deleteCarImage"

return this.httpClient.post<ResponseModel>(newPath,null)
}

}
