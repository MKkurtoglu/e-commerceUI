import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { response } from 'express';


@Component({
  selector: 'app-category-image',
  templateUrl: './category-image.component.html',
  styleUrl: './category-image.component.css'
})
export class CategoryImageComponent implements OnInit {
  ngOnInit(): void {
   this.activatedRouter.params.subscribe(response=>{
    if(response["id"]){
      this.selectedCategoryId=Number(response["id"])
    this.getCategoryImage(this.selectedCategoryId)
    this.getCategoryImage(this.selectedCategoryId)
    console.log(this.getCategoryImage(this.selectedCategoryId))
    }
   })
  }
  selectedImage: string | null = null;
selectedCategoryId:number
category:Category
  /**
   *
   */
  constructor(private categoryService:CategoryService,private activatedRouter:ActivatedRoute,private toastrService:ToastrService) {
    
    
  }


  getCategoryImage(id: number){
    this.categoryService.getCategoryById(id).subscribe(response=>{
      if(response.isSuccess && response.data){
        if(this.category && this.category!=null){
          this.toastrService.success("Resimler mevcut")
        }
        else{
          this.toastrService.info("Resim eklenmesi lazım")
        }
      }
      else{
        this.category=null
        this.toastrService.error("veri yok veya hatalı")
      }
    },
    error => {
      console.error('API çağrısı sırasında hata oluştu:', error);
      // this.toastrService.error("Veri yüklenirken bir hata oluştu");
      this.category = null;
    })
  }

  getImageUrl(imagePath: string): string {
    const path =imagePath;
    const baseUrl = 'https://localhost:44380/images/';
    const relativePath = path.split('\\').pop();
    const encodedPath = encodeURIComponent(relativePath || '');
    // Windows dosya yollarındaki backslash'leri slash'e çevir
    const normalizedPath = imagePath.replace(/\\/g, '/');
    
    // 'wwwroot/images' klasöründen sonraki dinamik klasörü bul
    const pathParts = normalizedPath.split('/');
    
    // 'images' klasöründen sonraki kısmı al (örn: 'product', 'category', 'blog')
    const imagesIndex = pathParts.indexOf('images');
    const dynamicFolder = pathParts[imagesIndex + 1]; // 'product', 'category' gibi
    const fileName = pathParts.pop(); // Dosya ismi
  
    // Eğer fileName boş değilse URL'yi oluştur
    if (fileName && imagePath!="C:\\Users\\kurto\\source\\repos\\IOProject\\WebAPI\\wwwroot\\images\\logo.jpg") {
      const encodedFileName = encodeURIComponent(fileName);
      const finalUrl = `${baseUrl}${dynamicFolder}/${encodedFileName}`;
      
      console.log(finalUrl);
      return finalUrl;
    }
    return `${baseUrl}${relativePath}`
  }

  openImageInModal(imagePath: string) {
    this.selectedImage = this.getImageUrl(imagePath);
  }
  
  closeModal() {
    this.selectedImage = null;
  }
  deleteImage(imageId :number){
    console.log("tetiklendi")
  this.categoryService.deleteCategoryImage(imageId,"Category").subscribe(response=>{
    if(response.isSuccess){
      this.toastrService.success("Silme İşlemi başarılı bir şekilde gerçekleşti")
      this.getCategoryImage(this.selectedCategoryId)
    }
  },error=>{
    this.toastrService.error(error)
  })
  }
}
