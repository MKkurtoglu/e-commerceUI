import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../../models/cartItem';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  searchTerm: string = '';
  cartItemCount: number = 0;
  cartItems: CartItem[]=[];
  logoPath = 'assets/images/copylinkedln.jpg'; 

  categories :any[];
  constructor(private cart:CartService,private categoryService : CategoryService,private toastr: ToastrService) {}

  ngOnInit(): void {
    // Sepet sayısını servisinizden alabilirsiniz
    this.getCategories();
  }

  onSearch(): void {
    // Arama işlemlerinizi burada gerçekleştirebilirsiniz
    console.log('Aranan terim:', this.searchTerm);
  }

  getCart(){
    this.cart.cartItems$.subscribe(response=>{
      this.cartItemCount=response.length
    });
    
  }
  getCategories(){
    this.categoryService.getAllCategories().subscribe(response=>{
      if(response.isSuccess){
        this.categories=response.data
        console.log(response.data)
      }
     
    })
  }
}
