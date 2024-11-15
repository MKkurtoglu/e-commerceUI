import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:44380/api/Carts';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {
    // Initialize cart from localStorage or API based on auth status
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.loadCartFromApi();
      } else {
        this.loadCartFromLocalStorage();
      }
    });
  }

  private loadCartFromApi() {
    this.http.get<any>(`${this.apiUrl}/items`).subscribe({
      next: (response) => {
        if (response.success) {
          this.cartItemsSubject.next(response.data);
        }
      },
      error: (error) => console.error('Cart loading error:', error)
    });
  }

  private loadCartFromLocalStorage() {
    const savedCart = this.localStorageService.getItemLocal('cart');
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  addToCart(product: Product, quantity: number = 1) {
    if (this.authService.isAuthenticated()) {
      this.addToCartApi(product, quantity);
    } else {
      this.addToCartLocal(product, quantity);
    }
  }

  private addToCartApi(product: Product, quantity: number) {
    const request = { productId: product.productId, quantity };
    this.http.post<any>(`${this.apiUrl}/add`, request).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadCartFromApi();
          this.toastr.success('Ürün sepete eklendi');
        }
      },
      error: (error) => {
        this.toastr.error('Ürün eklenirken hata oluştu');
        console.error('Add to cart error:', error);
      }
    });
  }

  private addToCartLocal(product: Product, quantity: number) {
    const currentCart = this.cartItemsSubject.value;
    const existingItem = currentCart.find(item => item.product.productId === product.productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ product, quantity });
    }

    this.cartItemsSubject.next(currentCart);
    this.localStorageService.addLocalStorage('cart', JSON.stringify(currentCart));
    this.toastr.success('Ürün sepete eklendi');
  }

  updateQuantity(cartId: number, quantity: number) {
    if (this.authService.isAuthenticated()) {
      this.http.put<any>(`${this.apiUrl}/update-quantity`, { cartId, quantity }).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadCartFromApi();
            this.toastr.success('Miktar güncellendi');
          }
        },
        error: (error) => {
          this.toastr.error('Miktar güncellenirken hata oluştu');
          console.error('Update quantity error:', error);
        }
      });
    }
  }

  removeFromCart(productId:number) {
    if (this.authService.isAuthenticated()) {
      // API'den silme
      let newPath = this.apiUrl+"remove?cartId"+productId
      this.http.post<any>(newPath,null).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadCartFromApi();
            this.toastr.success('Ürün sepetten kaldırıldı');
          }
        },
        error: (error) => {
          this.toastr.error('Ürün kaldırılırken hata oluştu');
          console.error('Remove from cart error:', error);
        }
      });
    } else {
      // Local storage'dan silme
      const currentCart = this.cartItemsSubject.value;
      const updatedCart = currentCart.filter(item => item.product.productId !== productId);
      this.cartItemsSubject.next(updatedCart);
      this.localStorageService.addLocalStorage('cart', JSON.stringify(updatedCart));
      this.toastr.success('Ürün sepetten kaldırıldı');
    }
  }

  clearCart() {
    if (this.authService.isAuthenticated()) {
      let newPath = this.apiUrl+"clear"
      this.http.post<any>(newPath,null).subscribe({
        next: (response) => {
          if (response.success) {
            this.cartItemsSubject.next([]);
            this.toastr.success('Sepet temizlendi');
          }
        },
        error: (error) => {
          this.toastr.error('Sepet temizlenirken hata oluştu');
          console.error('Clear cart error:', error);
        }
      });
    } else {
      this.cartItemsSubject.next([]);
      this.localStorageService.deleteLocalStorage('cart');
      this.toastr.success('Sepet temizlendi');
    }
  }

  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (item.product.unitPrice * item.quantity), 
      0
    );
  }
}