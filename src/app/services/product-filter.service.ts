import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, shareReplay } from 'rxjs';
import { FilterState } from '../models/FilterState';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  private filterStateSubject = new BehaviorSubject<FilterState>({
    brands: [],
    priceRanges: [],
    searchTerm: '',
  });

  private productsSubject = new BehaviorSubject<Product[]>([]);

  // Public observables
  readonly filterState$ = this.filterStateSubject.asObservable();
  readonly products$ = this.productsSubject.asObservable();

  // Combined filtered products observable
  readonly filteredProducts$ = combineLatest([
    this.products$,
    this.filterState$
  ]).pipe(
    map(([products, filters]) => this.applyFilters(products, filters)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  // Filter metrics observable for UI updates
  readonly filterMetrics$ = this.products$.pipe(
    map(products => this.calculateFilterMetrics(products)),
    shareReplay(1)
  );

  constructor() {}

  // Update methods for filter state
  updateBrandFilter(brands: string[]): void {
    this.filterStateSubject.next({
      ...this.filterStateSubject.value,
      brands
    });
  }

  updatePriceRangeFilter(priceRanges: string[]): void {
    this.filterStateSubject.next({
      ...this.filterStateSubject.value,
      priceRanges
    });
  }

  updateSearchTerm(searchTerm: string): void {
    this.filterStateSubject.next({
      ...this.filterStateSubject.value,
      searchTerm
    });
  }

  updateSortBy(sortBy: FilterState['sortBy']): void {
    this.filterStateSubject.next({
      ...this.filterStateSubject.value,
      sortBy
    });
  }

  // Update products
  updateProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  // Reset all filters
  resetFilters(): void {
    this.filterStateSubject.next({
      brands: [],
      priceRanges: [],
      searchTerm: '',
      sortBy: undefined
    });
  }

  // Private helper methods
  private applyFilters(products: Product[], filters: FilterState): Product[] {
    let filteredProducts = [...products];

    // Apply brand filter
    if (filters.brands.length > 0) {
      filteredProducts = this.applyBrandFilter(filteredProducts, filters.brands);
    }

    // Apply price range filter
    if (filters.priceRanges.length > 0) {
      filteredProducts = this.applyPriceRangeFilter(filteredProducts, filters.priceRanges);
    }

    // Apply search filter
    if (filters.searchTerm) {
      filteredProducts = this.applySearchFilter(filteredProducts, filters.searchTerm);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredProducts = this.applySorting(filteredProducts, filters.sortBy);
    }

    return filteredProducts;
  }

  private applyBrandFilter(products: Product[], brands: string[]): Product[] {
    return products.filter(product =>
      brands.some(brand =>
        product.brand?.brandName.toLowerCase().includes(brand.toLowerCase())
      )
    );
  }

  private applyPriceRangeFilter(products: Product[], priceRanges: string[]): Product[] {
    return products.filter(product =>
      priceRanges.some(range => {
        const [min, max] = range.split('-').map(Number);
        return product.unitPrice >= min && (max ? product.unitPrice <= max : true);
      })
    );
  }

  private applySearchFilter(products: Product[], searchTerm: string): Product[] {
    const normalizedSearch = searchTerm.toLowerCase();
    return products.filter(product =>
      product.productName.toLowerCase().includes(normalizedSearch) ||
      product.brand?.brandName.toLowerCase().includes(normalizedSearch)
    );
  }

  private applySorting(products: Product[], sortBy: FilterState['sortBy']): Product[] {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'price_asc':
        return sortedProducts.sort((a, b) => a.unitPrice - b.unitPrice);
      case 'price_desc':
        return sortedProducts.sort((a, b) => b.unitPrice - a.unitPrice);
      case 'name_asc':
        return sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
      case 'name_desc':
        return sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
      default:
        return sortedProducts;
    }
  }

  private calculateFilterMetrics(products: Product[]) {
    // Calculate counts for each filter option
    const brandCounts = new Map<string, number>();
    const priceRangeCounts = new Map<string, number>();

    products.forEach(product => {
      // Update brand counts
      const brandName = product.brand?.brandName;
      if (brandName) {
        brandCounts.set(brandName, (brandCounts.get(brandName) || 0) + 1);
      }

      // Update price range counts
      this.filterStateSubject.value.priceRanges.forEach(range => {
        const [min, max] = range.split('-').map(Number);
        if (product.unitPrice >= min && (max ? product.unitPrice <= max : true)) {
          priceRangeCounts.set(range, (priceRangeCounts.get(range) || 0) + 1);
        }
      });
    });

    return {
      brandCounts: Object.fromEntries(brandCounts),
      priceRangeCounts: Object.fromEntries(priceRangeCounts),
      totalProducts: products.length
    };
  }

  // Helper method to get filtered products as regular array
  getFilteredProducts(): Product[] {
    let products: Product[] = [];
    this.filteredProducts$.pipe(
      map(filteredProducts => products = filteredProducts)
    ).subscribe();
    return products;
  }
}
