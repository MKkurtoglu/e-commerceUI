import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrl: './brand-add.component.css'
})
export class BrandAddComponent {
  brandForm: FormGroup; // Reactive form
 

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm(); // Formu başlat
    
  }

  initializeForm() {
    this.brandForm = this.fb.group({
     
      brandName: ['', Validators.required] 
    });
  }





  
  onSubmit() {
    if (this.brandForm.valid) {
      console.log(this.brandForm.value); // Form verilerini kontrol etmek için ekledik.

      const modelData = {
        modelName: this.brandForm.value.brandName,
         // brandId'yi string'den int'e çeviriyoruz
      };
      this.brandService.addBrand(modelData).subscribe(
        response => {
          if (response.isSuccess) {
            this.toastrService.success('Model başarıyla eklendi!');
            this.brandService.getAllBrands();
            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/model']);
          });
            
          } else {
            this.toastrService.error('Model eklenirken bir hata oluştu.');
          }
        },
        error => {
          this.toastrService.error('Model eklenemedi: ' + error.message);
        }
      );
    }
  }
  
}
