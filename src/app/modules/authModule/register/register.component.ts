import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private registerService:RegisterService,private toastrService :ToastrService,private router:Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      var registerModel=Object.assign(this.registerForm.value)
      this.registerService.register(registerModel).subscribe(response=>{
        if(response.isSuccess){
          this.toastrService.success("Kullanıcı Kayıt Edildi")
          this.router.navigate(['login'])
        }
      },responseError=>{
        this.toastrService.error(responseError)
      })
    }
  }
}
