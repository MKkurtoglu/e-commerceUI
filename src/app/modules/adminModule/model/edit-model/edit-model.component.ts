import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModelService } from '../../../../services/model.service';
import { BrandService } from '../../../../services/brand.service';
import { Model } from '../../../../models/model';
import { Brand } from '../../../../models/brand';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.css']
})
export class EditModelComponent implements OnInit {
  modelForm: FormGroup; // Reactive form
  modelId: number; // Düzenlenecek modelin ID'si
  brands: Brand[] = []; // Marka listesi

  constructor(
    private fb: FormBuilder,
    private modelService: ModelService,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.modelId = this.route.snapshot.params['modelId']; // Route parametrelerinden model ID'sini al
  }

  ngOnInit(): void {
    this.initializeForm(); // Formu başlat
    this.getModel(); // Mevcut model bilgilerini getir
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

  getModel() {
    console.log("değişken türü "+typeof(this.modelId))
    console.log()
    this.modelService.getModelById(this.modelId).subscribe(
      response => {
        if (response.isSuccess) {
          this.modelForm.patchValue(response.data); // Mevcut model bilgilerini forma doldur
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
    if (this.modelForm.valid) {
      console.log(this.modelForm.value); // Form verilerini kontrol etmek için ekledik.

      const modelData = {
        modelId: parseInt(this.route.snapshot.params['modelId'], 10), // modelId'yi doğru alıyoruz
        modelName: this.modelForm.value.modelName,
        brandId: parseInt(this.modelForm.value.brandId, 10)
      };
      console.log(modelData)
      this.modelService.updateModel(modelData).subscribe(
        response => {
          if (response.isSuccess) {
            this.toastrService.success('Model başarıyla güncellendi!');
            this.modelService.getModels();


            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/model']);
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
