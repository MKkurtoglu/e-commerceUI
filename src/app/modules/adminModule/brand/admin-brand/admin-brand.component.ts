import { Component } from '@angular/core';
import { Brand } from '../../../../models/brand';
import { BrandService } from '../../../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrl: './admin-brand.component.css'
})
export class AdminBrandComponent {
  brands: Brand[] = [];

  constructor(private brandService: BrandService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getModels();
  }

  getModels() {
    this.brandService.getAllBrands().subscribe(
      response => {
        if (response.isSuccess) {
          this.brands = response.data;
          console.log(response.data)
          this.toastrService.success('Markalar Yüklendi');
        }
      },
      error => {
        this.toastrService.error(error.message);
      }
    );
  }

  deleteBrand(brandId: number) {
    this.brandService.deleteBrand(brandId).subscribe(
      response => {
        if (response.isSuccess) {
          this.brands = this.brands.filter(brand => brand.brandId !== brandId);
          this.toastrService.success('Marka Silindi');
        }
      },
      error => {
        this.toastrService.error('Marka silme başarısız');
      }
    );
  }
}
