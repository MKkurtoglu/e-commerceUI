import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { CategoryDto } from '../../../models/categoryDto';

@Component({
  selector: 'app-category-stories',
  templateUrl: './category-stories.component.html',
  styleUrl: './category-stories.component.css'
})
export class CategoryStoriesComponent implements OnInit{
  ngOnInit(): void {
    this.getAllCategories()
  }
  /**
   *
   */
  constructor(private categoryService: CategoryService) {
    
    
  }
  categories: CategoryDto[]


  getAllCategories() {
    this.categoryService.getAllCategoriesDto().subscribe(response => {
      this.categories = response.data;
      console.log("bu "+this.categories)
    });
  }
  getImageUrl(imagePath: string | null): string {
    if (!imagePath) {
      // Eğer imagePath null veya undefined ise, varsayılan bir URL döndürebilirsiniz
      return 'https://localhost:44380/images/logo.jpg'; // Varsayılan resim URL'si
    }
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
}
