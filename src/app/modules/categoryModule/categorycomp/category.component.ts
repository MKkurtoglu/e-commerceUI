import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { Router } from '@angular/router';
import { CategoryWithCount } from '../../../models/categoryWithCount';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  /**
   *
   */
  clear: boolean = true;
  totalProducts: number = 0;
  constructor(private categoryService:CategoryService,private router: Router) {
    
    
  }
  categories:CategoryWithCount[]=[];
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(response=>{
      this.categories=response.data
      console.log(response.data)
    })
  }

  selectedCategory: CategoryWithCount;

  selectCategory(category: any | undefined) {
    if (category) {
      this.selectedCategory = category;
      this.clear = false;
      // Navigate with categoryId as a route parameter
      this.router.navigate(['/products/category', category.categoryId]);
    } else {
      this.clearcategory();
    }
 
  }
  clearcategory(){
    this.selectedCategory = { categoryId: 0, categoryName: '',isDeleted:false }
    this.clear=true
    this.router.navigate(['/']); // veya bu şekilde
  }
  calculateTotalProducts() {
    this.totalProducts = this.categories.reduce((total, category) => 
      total + (category.productCount || 0), 0);
  }

  getCategoryIcon(categoryName: string): string {
    // Kategori ismine göre ikon seç
    const icons: { [key: string]: string } = {
      'Elektronik': 'fas fa-mobile-alt',
      'Giyim': 'fas fa-tshirt',
      'Kitap': 'fas fa-book',
      'Spor': 'fas fa-running',
      'Ev': 'fas fa-home',
      'Kozmetik': 'fas fa-magic',
      'Oyuncak': 'fas fa-gamepad',
      'Gıda': 'fas fa-utensils'
    };

    return icons[categoryName] || 'fas fa-folder';
  }
}
