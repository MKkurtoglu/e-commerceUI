import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { response } from 'express';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../models/category';
import { Model } from '../../../../models/model';
import { CategoryService } from '../../../../services/category.service';
import { ModelService } from '../../../../services/model.service';
import { BrandService } from '../../../../services/brand.service';
import { Brand } from '../../../../models/brand';

@Component({
  selector: 'app-control-product',
  templateUrl: './control-product.component.html',
  styleUrl: './control-product.component.css'
})
export class ControlProductComponent implements OnInit{
  products: Product[] = [];
  textFilter: string="";
  dataloaded = false;


  productForm: FormGroup;
  categories: Category[] = [];
  brands:Brand[]=[];
  models: Model[] = [];
  isAddingOrEditing: boolean = false;
  isEditing:boolean
  constructor(private productService: ProductService,private brandService:BrandService,private categoryService:CategoryService ,private modelService:ModelService,private formbuilder: FormBuilder, private acivatedRoute: ActivatedRoute,private toastr: ToastrService) {}
  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ['', Validators.required],
      categoryId: ['', Validators.required],
      modelId: ['', Validators.required],
      unitsInStock: [0, [Validators.required, Validators.min(0)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      brandId: ['', Validators.required]
      }

    )
this.getProducts();
      this.loadCategories();
    
    this.loadBrands();
  }

// Markaları yükleme
loadBrands() {
  this.brandService.getAllBrands().subscribe(response => {
    this.brands = response.data;
  });
}

// Marka değiştiğinde modelleri yükleme
onBrandChange(event: any) {
  const selectedBrandId = event.target.value;
  if (selectedBrandId) {
    this.loadModels(selectedBrandId);
  }
}

  loadCategories() {
    // Kategorileri productService'den alabilirsiniz
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories.data;
    });
  }

  loadModels(brandId:number) {
    // Modelleri productService'den alabilirsiniz
    this.modelService.getModelsByBrand(brandId).subscribe(models => {
      this.models = models.data;
    });
  } 

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
      this.dataloaded = true;
    });
  }


  onFileChange(event: any,entityId: number) {
    const file = event.target.files[0];
    if (file) {
      
        this.addProductImage(file,entityId,"product"); // Ekleme işlemi
      }
    }

   
    addProduct(product:any){
this.productService.add(product).subscribe(response=>{
  if(response.isSuccess){
    this.toastr.success("Ürün Eklenmiştir..")
  }
},error => {
  console.log(error);
  if (error.status === 403) {
    // 403 Forbidden yetki hatası için mesaj
    this.toastr.error(error.error.Message || "Yetkiniz yok.", "Yetki Hatası");
  } else if (error.error && Array.isArray(error.error.Error)) {
    // Validation hatalarını kullanıcıya göster
    error.error.Error.forEach((err: any) => {
      if (err.PropertyName && this.productForm.get(err.PropertyName)) {
        this.productForm.get(err.PropertyName)?.setErrors({ customError: err.ErrorMessage });
        this.toastr.error(err.ErrorMessage, "Doğrulama Hatası");
      }
    });
  } else {
    // Eğer başka bir hata tipi olursa
    this.toastr.error(error.error.Message || "Bilinmeyen bir hata oluştu", "Hata");
  }
}
);
    }


    deleteProduct(id:number){
      this.productService.getProduct(id).subscribe(response=>{
        if(response.isSuccess){
          this.productService.deleteProduct(response.data)
          this.toastr.info("Ürün silinmiştir")
        }

        else{
          this.toastr.error("Ürün silinememiştir..")
        }

      })
    }

    editProduct(product: any){
      this.isAddingOrEditing = true;
      this.isEditing = true;
      let selectedProductId = product.productId; // Seçili ürünün ID'sini sakla
    
      // Eğer formda productId alanı yoksa ekle
      if (!this.productForm.contains('productId')) {
        this.productForm.addControl('productId', this.formbuilder.control(product.productId));
      }
    
      // Seçilen kategori ve modeli bul
      const selectedCategory = this.categories.find(category => category.categoryName === product.category.categoryName);
      const selectedModel = this.models.find(model => model.modelName === product.model.modelName);
    
      // Eğer kategori ve model varsa formu doldur
      if (selectedCategory || selectedModel) {
        this.productForm.patchValue({
          productId: product.productId,
          productName: product.productName,
          categoryId: selectedCategory?.categoryId, // Kategori varsa ID'sini ata
          modelId: selectedModel?.modelId,          // Model varsa ID'sini ata
          unitsInStock: product.unitsInStock,
          unitPrice: product.unitPrice
        });
    
        // Güncellenmiş form verilerini kontrol etmek için konsola yazdır
        console.log(Object.assign({}, this.productForm.value));
      }
    }

    addProductImage(file:File,entityId:number,entityType:string){
      this.productService.addProductImage(file,entityId,entityType).subscribe(response=>{
        if(response.isSuccess){
          this.toastr.success("Ürün görseli eklemesi başarılı")
        }
      },
      error => {
        console.log(error);
        if (error.status === 403) {
          // 403 Forbidden yetki hatası için mesaj
          this.toastr.error(error.error.Message || "Yetkiniz yok.", "Yetki Hatası");
        } else if (error.error && Array.isArray(error.error.Error)) {
          // Validation hatalarını kullanıcıya göster
          error.error.Error.forEach((err: any) => {
            if (err.PropertyName && this.productForm.get(err.PropertyName)) {
              this.productForm.get(err.PropertyName)?.setErrors({ customError: err.ErrorMessage });
              this.toastr.error(err.ErrorMessage, "Doğrulama Hatası");
            }
          });
        } else {
          // Eğer başka bir hata tipi olursa
          this.toastr.error(error.error.Message || "Bilinmeyen bir hata oluştu", "Hata");
        }
      }
    );
    }


    showAdd(){
      this.isEditing = false;
      this.isAddingOrEditing=true;
      console.log(this.isAddingOrEditing)
    }

    backandreset(){
      this.productForm.reset();
      this.isAddingOrEditing=false;
    }

    onSubmit() {
      if (this.productForm.valid) {
        const productData = this.productForm.value;
        // Araç ekleme veya güncelleme işlemi
        if (this.isEditing) {
          this.productService.updateProduct(productData).subscribe(() => {
            this.loadBrands();
            this.loadCategories(); // Verileri tekrar yükleyin
            this.backandreset(); // Formu sıfırlayın ve geri dönün
          });
        } else {
          this.productService.add(productData).subscribe(() => {
            this.loadBrands();
            this.loadCategories(); // Verileri tekrar yükleyin
            this.backandreset(); // Formu sıfırlayın ve geri dönün
          });
        }
      }
    }
}
