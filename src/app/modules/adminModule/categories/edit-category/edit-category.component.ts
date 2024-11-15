import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit{
  categoryForm: FormGroup;
  categoryId:number
  constructor(private fb: FormBuilder, private categoryService: CategoryService, private route: ActivatedRoute,private toastrService:ToastrService, private router: Router) { 

    this.categoryId = this.route.snapshot.params['categoryId'];
     
  }

  ngOnInit(): void {
    this.createCategoryForm();
   this.getCategory()
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      
      categoryName: ['', Validators.required]
    });
  }

  getCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe(response => {
      this.categoryForm.patchValue(response.data);
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value); // Form verilerini kontrol etmek için ekledik.

      const modelData = {
        
        brandName: this.categoryForm.value.brandName,
        brandId: parseInt(this.route.snapshot.params['categoryId'], 10)
      };
      console.log(modelData)
      this.categoryService.updateCategory(modelData).subscribe(
        response => {
          if (response.isSuccess) {
            this.toastrService.success('Model başarıyla güncellendi!');
            this.categoryService.getAllCategories();


            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/categories']);
          });
          } else {
            this.toastrService.error('Kategori güncellenirken bir hata oluştu.');
          }
        },
        error => {
          this.toastrService.error('Kategori güncellenemedi: ' + error.message);
        }
      );
    }
  }
}
