import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  isEditing = false;
  selectedCategory: Category | null = null;
  isImageLoading = false;

  constructor(private categoryService: CategoryService,private formBuilder: FormBuilder,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  deleteCategory(categoryId:number){
this.categoryService.deleteCategory(categoryId).subscribe(response=>{
  if(response.isSuccess){
    this.toastr.success(categoryId+"'ID numaralı kategori silinmiştir.")
    this.getAllCategories();
  }
},
error => {
  this.toastr.error('Marka silme başarısız');
})
  }

  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      categoryId: [null],
      categoryName: ['', Validators.required]
    });
  }


  loadCategories() {
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  onFileChange(event: any, categoryId: number) {
    const file = event.target.files[0];
    if (file) {
      this.isImageLoading = true;
      this.categoryService.addCategoryImage(file, categoryId).subscribe(
        response => {
          if (response.isSuccess) {
            this.toastr.success('Kategori görseli başarıyla eklendi');
            this.loadCategories();
          }
        },
        error => {
          this.toastr.error('Görsel yükleme başarısız');
          console.error(error);
        }
      ).add(() => {
        this.isImageLoading = false;
      });
    }
  }
}
