import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';
import { LocalStorageService } from '../../../services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../../models/DecodedToken';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isAdminLoggedIn$: Observable<boolean>; // Admin login durumu için gözlemci  
  /**
   *
   */
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.authService.isAuthenticated());
  // isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Componentler bu değişkeni gözlemleyebilir
  loginForm:FormGroup
  
  constructor(private authService : AuthService,private toastService :ToastrService,private formBuilder :FormBuilder,private localStorageService:LocalStorageService,private router :Router) {
    
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isAdminLoggedIn$ = this.authService.isAdminLoggedIn$; // Admin durumu
  }
  
  ngOnInit(): void {
    this.createLoginForm();
  }




  createLoginForm(){
    this.loginForm =this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  submit(){
    console.log("Form submit tetiklendi");  
    if(this.loginForm.valid){
let loginModel=Object.assign({},this.loginForm.value)
console.log("Form submit mevcut");  
    
    this.authService.login(loginModel).subscribe(response=>{
      if(response.isSuccess){
        
        this.localStorageService.addLocalStorage("token",response.data.token)
       
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
      this.router.navigate(['/admin/product/']);
  } else if (rolesArray.includes('customer')) {
    console.log("customer girişi")

      this.router.navigate(['/products']);
  }
}
      }
    else {
      // API yanıtı olumsuz ise kullanıcıya hata mesajı gösterin
      this.toastService.error('Giriş başarısız. Yanıt: ' + response.message);
    }
  }, responseError => {
    console.log("Login Hatası: ", responseError);
    this.toastService.error('Giriş sırasında bir hata oluştu.');
  });
    }
  }
}
