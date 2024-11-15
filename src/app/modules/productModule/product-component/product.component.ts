import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from '../../../services/favorite.service';
import { ProductFilterService } from '../../../services/product-filter.service';
import { map, Observable } from 'rxjs';
import Swiper from 'swiper';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  dataloaded = false;
  products: Product[] = [];
  currentImageIndex: { [key: number]: number } = {};
  filteredProducts$: Observable<Product[]>;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalItems: number = 0;
  constructor(
    private productService: ProductService,
    private filterService: ProductFilterService,
    private favoriteService: FavoriteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private cart: CartService
  ) {
    this.filteredProducts$ = this.filterService.filteredProducts$.pipe(
      map(products => {
        this.totalItems = products.length;
        return products;
      })
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.getProductsByCategory(Number(categoryId));
      } else {
        this.getProducts();
      }
    });

    this.filteredProducts$.subscribe(products => {
      this.totalItems = products.length;
      // Eğer mevcut sayfa boşsa, ilk sayfaya dön
      const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      if (this.currentPage > totalPages) {
        this.currentPage = 1;
      }
    });
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getProducts() {
    this.productService.getProducts2().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.products = response.data;
          this.filterService.updateProducts(response.data);
          this.dataloaded = true;
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.dataloaded = true;
      }
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getByCategory(categoryId).subscribe({
      next: (response) => {
        this.products = response.data;
        this.filterService.updateProducts(response.data);
        this.dataloaded = true;
      },
      error: (error) => {
        console.error('Error loading category products:', error);
        this.dataloaded = true;
      }
    });
  }

  handleProductPrice(priceRanges: string[]) {
    this.filterService.updatePriceRangeFilter(priceRanges);
  }

  handleProductBrand(brands: string[]) {
    this.filterService.updateBrandFilter(brands);
  }

  getCurrentImageIndex(productId: number): number {
    if (!(productId in this.currentImageIndex)) {
      this.currentImageIndex[productId] = 0;
    }
    return this.currentImageIndex[productId];
  }

  prevImage(productId: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!(productId in this.currentImageIndex)) {
      this.currentImageIndex[productId] = 0;
    }
    
    const product = this.products.find(p => p.productId === productId);
    if (product) {
      this.currentImageIndex[productId]--;
      if (this.currentImageIndex[productId] < 0) {
        this.currentImageIndex[productId] = product.imagePaths.length - 1;
      }
    }
  }

  nextImage(productId: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!(productId in this.currentImageIndex)) {
      this.currentImageIndex[productId] = 0;
    }
    
    const product = this.products.find(p => p.productId === productId);
    if (product) {
      this.currentImageIndex[productId]++;
      if (this.currentImageIndex[productId] >= product.imagePaths.length) {
        this.currentImageIndex[productId] = 0;
      }
    }
  }

  getImageUrl(imagePath: string): string {
    const path = imagePath;
    const baseUrl = 'https://localhost:44380/images/';
    const relativePath = path.split('\\').pop();
    const normalizedPath = imagePath.replace(/\\/g, '/');
    const pathParts = normalizedPath.split('/');
    const imagesIndex = pathParts.indexOf('images');
    const dynamicFolder = pathParts[imagesIndex + 1];
    const fileName = pathParts.pop();
  
    if (fileName && imagePath != "C:\\Users\\kurto\\source\\repos\\IOProject\\WebAPI\\wwwroot\\images\\logo.jpg") {
      const encodedFileName = encodeURIComponent(fileName);
      return `${baseUrl}${dynamicFolder}/${encodedFileName}`;
    }
    return `${baseUrl}${relativePath}`;
  }

  addToCart(product: Product, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.toastr.success(product.productName + ' başarıyla sepete eklendi!');
    this.cart.addToCart(product);
  }

  toggleFavorite(product: Product, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (this.favoriteService.isFavorite(product.productId)) {
      this.favoriteService.removeFromFavorites(product.productId);
    } else {
      this.favoriteService.addToFavorites(product);
    }
  }

  isFavoritee(id: number) {
    return this.favoriteService.isFavorite(id);
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/diktat.png';
  }
}