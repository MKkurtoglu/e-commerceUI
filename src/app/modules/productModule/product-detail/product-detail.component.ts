import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity: number = 1;
  selectedImage: string | null = null;
  isFavorite: boolean = false;
  hasDiscount: boolean = false; // İndirim durumunu kontrol etmek için

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getProduct(params['id']);
        console.log(this.getProduct(params['id']))
      }
    });
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => {
        this.product = product.data;
        this.selectedImage = product.data.primaryImagePath || product.data.imagePaths[0];
        // İndirim kontrolü burada yapılabilir
      }
    );
  }
  getImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) {
      return 'assets/images/placeholder.png'; // Varsayılan resim
    }

    try {
      const path = imagePath;
      const baseUrl = 'https://localhost:44380/images/';
      const relativePath = path.split('\\').pop();
      const normalizedPath = imagePath.replace(/\\/g, '/');
      const pathParts = normalizedPath.split('/');
      const imagesIndex = pathParts.indexOf('images');
      
      if (imagesIndex === -1) {
        return 'assets/images/placeholder.png';
      }

      const dynamicFolder = pathParts[imagesIndex + 1];
      const fileName = pathParts.pop();

      if (fileName && imagePath !== "C:\\Users\\kurto\\source\\repos\\IOProject\\WebAPI\\wwwroot\\images\\logo.jpg") {
        const encodedFileName = encodeURIComponent(fileName);
        return `${baseUrl}${dynamicFolder}/${encodedFileName}`;
      }
      
      return `${baseUrl}${relativePath}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return 'assets/images/placeholder.png';
    }
  }
  increaseQuantity() {
    if (this.product && this.quantity < this.product.unitsInStock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product) {
      for(let i = 0; i < this.quantity; i++) {
        this.cartService.addToCart(this.product);
      }
      this.toastr.success('Ürün sepete eklendi');
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Favorilere ekleme/çıkarma işlemi burada yapılabilir
  }

  getDiscountedPrice(): number {
    if (!this.product) return 0;
    // İndirim hesaplama mantığı burada
    return this.product.unitPrice;
  }
}