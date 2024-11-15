import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';
import { FavoriteItem } from '../models/favoriteItem';



@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'https://localhost:44380/api/Favorites';
  private favoriteItemsSubject = new BehaviorSubject<FavoriteItem[]>([]);
  favoriteItems$ = this.favoriteItemsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.loadFavorites();
      } else {
        this.favoriteItemsSubject.next([]);
      }
    });
  }

  loadFavorites() {
    this.http.get<any>(`${this.apiUrl}/getAllFavoritesByUser`).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.favoriteItemsSubject.next(response.data);
        }
      },
      error: (error) => {
        console.error('Favoriler yüklenemedi:', error);
      }
    });
  }

  addToFavorites(product: Product): void {
    if (!this.authService.isAuthenticated()) {
      this.toastr.warning('Favorilere eklemek için giriş yapmalısınız');
      this.router.navigate(['/login']);
      return;
    }

    const favoriteDto = { productId: product.productId };
    
    this.http.post<any>(`${this.apiUrl}/addFavorite`, favoriteDto).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.toastr.success('Ürün favorilere eklendi');
          this.loadFavorites();
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (error) => {
        this.toastr.error('Bir hata oluştu');
        console.error('Favorilere ekleme hatası:', error);
      }
    });
  }

  removeFromFavorites(productId: number): void {
    // Favori ID'sini favorites listesinden bul
    const favorite = this.favoriteItemsSubject.value.find(f => f.productId === productId);
    
    if (!favorite) {
      console.error('Favori bulunamadı');
      return;
    }

    this.http.delete<any>(`${this.apiUrl}/deleteFavorite?id=${favorite.favoriteId}`).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.toastr.success('Ürün favorilerden kaldırıldı');
          this.loadFavorites();
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (error) => {
        this.toastr.error('Bir hata oluştu');
        console.error('Favorilerden kaldırma hatası:', error);
      }
    });
  }

  isFavorite(productId: number): boolean {
    const favorites = this.favoriteItemsSubject.value;
    return favorites.some(item => item.productId === productId);
  }

  getFavoriteId(productId: number): number | undefined {
    const favorite = this.favoriteItemsSubject.value.find(f => f.productId === productId);
    return favorite?.favoriteId;
  }
}