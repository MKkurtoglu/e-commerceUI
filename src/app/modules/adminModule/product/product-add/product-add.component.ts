import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})

// form işlemini reactive form ile yapacağız. bunun için reactiveform module ekleyeceğiz. app module'e gelip reactiveFormsModule ekleyeceğiz importa.

export class ProductAddComponent implements OnInit {
/**
 *
 */
constructor(private formBuilder:FormBuilder,private productService:ProductService,private toastrService :ToastrService) {
  
  
}
  ngOnInit(): void {
    this.createProductAddForm();
  }
productAddForm:FormGroup
createProductAddForm(){
this.productAddForm = this.formBuilder.group({
  productName:["",Validators.required],
  unitPrice:["",Validators.required],
  unitsInStock:["",Validators.required],
  categoryId:["",Validators.required]
})
}
addProduct(){
  let productFormModel = Object.assign({},this.productAddForm.value) ;
  console.log(productFormModel)
  this.productService.add(productFormModel).subscribe(response=>{
    console.log(response)
    if(response.isSuccess){
      this.toastrService.success("Ürün eklenmiştir. Eklenen CategoryId:" +productFormModel.categoryId)
    }
    else{
      this.toastrService.error("Hata mevcut","dikkat")
    }
  },responseError=>{
    console.log(responseError)
    if (responseError.error && responseError.error.Error && Array.isArray(responseError.error.Error)) {
      // Hata mesajlarını kullanıcıya göster
      responseError.error.Error.forEach((error: any) => {
        if (error.PropertyName && this.productAddForm.get(error.PropertyName)) {
          this.productAddForm.get(error.PropertyName)?.setErrors({ customError: error.ErrorMessage });
        }
        this.toastrService.error(error.ErrorMessage, "Doğrulama Hatası");
        
      });
    } else {
      // Eğer başka bir hata tipi olursa
      this.toastrService.error(responseError.error.message, "Hata");
    }
  })
}
}
