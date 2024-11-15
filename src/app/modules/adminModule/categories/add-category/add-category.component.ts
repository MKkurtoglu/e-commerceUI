import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value); // Form verilerini kontrol etmek için ekledik.

      const modelData = {
        modelName: this.categoryForm.value.brandName,
         // brandId'yi string'den int'e çeviriyoruz
      };
      this.categoryService.addCategory(modelData).subscribe(
        response => {
          if (response.isSuccess) {
            this.toastrService.success('Model başarıyla eklendi!');
            this.categoryService.getAllCategories();
            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/categories']);
          });
            
          } else {
            this.toastrService.error('Kategori eklenirken bir hata oluştu.');
          }
        },
        error => {
          this.toastrService.error('Kategori eklenemedi: ' + error.message);
        }
      );
    }
  }
}
