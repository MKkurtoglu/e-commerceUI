import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  cartItems: CartItem[] = [];
  private cartSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {
    // CartService'den gelen güncellemeleri dinle
    this.cartSubscription = this.cartService.cartItems$.subscribe(
      (items: CartItem[]) => {
        this.cartItems = items;
        this.updateCartCount();
      }
    );
  }

  ngOnInit(): void {
    // Başlangıçta sepet durumunu al
    this.updateCartCount();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  updateCartCount(): void {
    this.cartItemCount = this.cartItems.reduce(
      (total, item) => total + item.quantity, 
      0
    );
  }

  getImageUrl(imagePath: string): string {
    const path = imagePath;
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
    if (fileName && imagePath != "C:\\Users\\kurto\\source\\repos\\IOProject\\WebAPI\\wwwroot\\images\\logo.jpg") {
      const encodedFileName = encodeURIComponent(fileName);
      const finalUrl = `${baseUrl}${dynamicFolder}/${encodedFileName}`;
      return finalUrl;
    }
    return `${baseUrl}${relativePath}`;
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  calculateTotal(): number {
    return this.cartService.getCartTotal();
  }

  // Yeni eklenen metodlar
  updateQuantity(cartId: number, newQuantity: number): void {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(cartId, newQuantity);
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}