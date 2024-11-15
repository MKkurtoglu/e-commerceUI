import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileImage } from '../../../models/profile-image';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ProfileImageService } from '../../../services/profile-image.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  profileForm: FormGroup;
  user: any;
  isSubmitting = false;
profileImageData:ProfileImage
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private authService:AuthService,
    private profileImageService:ProfileImageService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    // Kullanıcı verilerini yükleme (backend'den API ile çağırarak)
    this.loadUserData();
  }
  loadUserData() {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        
        this.populateForm()// Veriler alındığında formu başlat
      }
    });
  }
  initializeForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  populateForm() {
    if (this.user) {
      this.profileForm.patchValue({
        firstName: this.user.firstName || '',
        lastName: this.user.lastName || '',
        email: this.user.email || ''
      });
    }
  }
  // Şifre doğrulama işlemi
  
  // Form gönderme işlemi
  onSubmit() {
    if (this.profileForm.invalid) {
      this.toastr.error('Lütfen gerekli alanları doldurunuz.');
      return;
    }

    

    this.isSubmitting = true;

    const profileData = {
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      email: this.profileForm.get('email')?.value
      
    };
let sendData= Object.assign({},profileData)
    // Profil güncelleme işlemi (Backend API çağrısı)
    this.authService.updateUserProfile(sendData).subscribe({
      next: () => {
        this.toastr.success('Profil başarıyla güncellendi.');
        this.isSubmitting = false;
      },
      error: (error) => {
        this.toastr.error('Profil güncellenirken bir hata oluştu.');
        this.isSubmitting = false;
      }
    });
  }

}
