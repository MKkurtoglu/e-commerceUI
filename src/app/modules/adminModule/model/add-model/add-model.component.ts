import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModelService } from '../../../../services/model.service';
import { BrandService } from '../../../../services/brand.service';
import { Brand } from '../../../../models/brand';
import { Model } from '../../../../models/model';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
  modelForm: FormGroup; // Reactive form
  brands: Brand[] = []; // Marka listesi

  constructor(
    private fb: FormBuilder,
    private modelService: ModelService,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm(); // Formu başlat
    this.getBrands(); // Markaları yükle
  }

  initializeForm() {
    this.modelForm = this.fb.group({
      modelName: ['', Validators.required], // Model adı zorunlu
      brandId: ['', Validators.required] // Marka seçimi zorunlu
    });
  }





  getBrands() {
    this.brandService.getAllBrands().subscribe(
      response => {
        if (response.isSuccess) {
          this.brands = response.data; // Markaları al
        }
      },
      error => {
        this.toastrService.error('Markalar yüklenirken bir hata oluştu.');
      }
    );
  }

  onSubmit() {
    if (this.modelForm.valid) {
      console.log(this.modelForm.value); // Form verilerini kontrol etmek için ekledik.

      const modelData = {
        modelName: this.modelForm.value.modelName,
        brandId: parseInt(this.modelForm.value.brandId, 10) // brandId'yi string'den int'e çeviriyoruz
      };
      this.modelService.addModel(modelData).subscribe(
        response => {
          if (response.isSuccess) {
            this.toastrService.success('Model başarıyla eklendi!');
            this.modelService.getModels();
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
