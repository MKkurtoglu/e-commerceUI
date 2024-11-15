import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { loginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';

import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { UpdateUserDto } from '../models/updateUserDto';
import { ResponseModel } from '../models/responseModel';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../models/DecodedToken';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
isAdminLoggedIn$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private httpClient :HttpClient,private toastService:ToastrService ,private localStorageService:LocalStorageService,private router:Router,@Inject(PLATFORM_ID) private platformId: Object) { 


    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn$.next(true);
      }
    }
  }

  apiURL= "https://localhost:44380/api/";

 

  login(login:loginModel):Observable<SingleResponseModel<TokenModel>>{
   let newPath =this.apiURL+"auth/login";
   return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,login).pipe(tap(response=>{
    if(response.isSuccess){
      const decodedToken = jwtDecode<DecodedToken>(response.data.token);
        const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; 
        const rolesArray = roles ? [roles] : [];
console.log(decodedToken)
if (!rolesArray.length) {
  console.error('Roles not found or is not an array:', rolesArray);
  this.toastService.error('Rol bilgisi alınamadı.');
} else {
  if (rolesArray.includes('admin')) {
    console.log("admin girişi")
    this.isAdminLoggedIn$.next(true) 
    this.localStorageService.addLocalStorage("token", response.data.token);
  }

    else if (rolesArray.includes('customer')) {
      console.log("customer girişi")
      this.isLoggedIn$.next(true);
      this.localStorageService.addLocalStorage("token", response.data.token);
  
        this.router.navigate(['/products']);
    }
      console.log("işlem başarılı")
     
      
      this.isLoggedInSubject.next(true)
    }
    
   }
   console.log("login olma işlemi başarısız")}));
  }

  updateUserProfile(updateUserDto :UpdateUserDto):Observable<ResponseModel>{
    let newPath = this.apiURL +"auth/updateUser" 
    return this.httpClient.post<ResponseModel>(newPath,updateUserDto)
  }


  isAuthenticated(){
    if(this.localStorageService.getItemLocal("token")){
      return true
    }
    else{
     return false
    }
  }

  logout(){
    this.localStorageService.deleteLocalStorage("token");
    this.isLoggedInSubject.next(false);
   this.isLoggedIn$.next(false)
   this.isAdminLoggedIn$.next(false)

  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
