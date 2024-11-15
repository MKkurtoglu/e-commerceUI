import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '../../../../models/brand';


@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrl: './edit-brand.component.css'
})
export class EditBrandComponent implements OnInit {
  ngOnInit(): void {
    this.initializeForm();
    this.getBrand();
  }
brandForm:FormGroup
brandId:number
brand:Brand
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.brandId = this.route.snapshot.params['brandId'];
  }

  initializeForm() {
    this.brandForm = this.fb.group({
     
      brandName: ['', Validators.required] 
    });
  }

  getBrand() {
    console.log("değişken türü "+typeof(this.brandId))
    console.log()
    this.brandService.getBrandById(this.brandId).subscribe(
      response => {
        if (response.isSuccess) {
          this.brandForm.patchValue(response.data); // Mevcut model bilgilerini forma doldur
        } else {
          this.toastrService.error('Model bilgisi yüklenemedi.');
        }
      },
      error => {
        this.toastrService.error('Model bilgisi getirilemedi: ' + error.message);
      }
    );
  }

  onSubmit() {
    if (this.brandForm.valid) {
      console.log(this.brandForm.value); // Form verilerini kontrol etmek için ekledik.

      const modelData = {
        
        brandName: this.brandForm.value.brandName,
        brandId: parseInt(this.route.snapshot.params['brandId'], 10)
      };
      console.log(modelData)
      this.brandService.updateBrand(modelData).subscribe(
        response => {
          if (response.isSuccess) {
            this.toastrService.success('Model başarıyla güncellendi!');
            this.brandService.getAllBrands();


            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/brand']);
          });
          } else {
            this.toastrService.error('Model güncellenirken bir hata oluştu.');
          }
        },
        error => {
          this.toastrService.error('Model güncellenemedi: ' + error.message);
        }
      );
    }
  }
}
