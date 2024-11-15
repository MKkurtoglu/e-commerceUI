import { Component } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { ResponseModel } from '../../../models/responseModel';
import { ListResponseModel } from '../../../models/listResponseModel';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  categories: { id:number;name: string}[] = [];
  logoUrl = 'assets/images/Kurtoglu_Logo_Beyaz.png';
  googlePlayImg = 'assets/images/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo-thumbnail.png'; // Bu resmi assets klasörüne koymanız gerekiyor
  appStoreImg = 'assets/images/dbafb3f2b9df40c93c2a44cbb5ab9171.webp'; // Bu resmi assets klasörüne koymanız gerekiyor
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.data.map((cat) => ({
        name: cat.categoryName,
        id:cat.categoryId
      }));
    });
  }
}
