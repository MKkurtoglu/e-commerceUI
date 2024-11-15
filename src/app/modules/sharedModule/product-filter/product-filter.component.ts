import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Brand } from '../../../models/brand';
import { BrandService } from '../../../services/brand.service';
import { BrandWithCount } from '../../../models/brandWithCount';
import { ProductFilterService } from '../../../services/product-filter.service';
import { Subject, takeUntil } from 'rxjs';

interface PriceRange {
  label: string;
  value: string;
  count?: number;
}

interface ActiveFilter {
  type: 'price' | 'brand';
  value: string;
  label: string;
}

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFilterComponent implements OnInit {
  brandList: BrandWithCount[] = [];
  selectedPriceRanges: string[] = [];
  selectedBrand: string[] = [];
  private destroy$ = new Subject<void>();
  @Output() productPriceChanged = new EventEmitter<string[]>();
  @Output() productBrandChanged = new EventEmitter<string[]>();

  isPriceFilterOpen: boolean = true;
  isBrandFilterOpen: boolean = true;
  brandSearchTerm: string = '';
  activeFilters: ActiveFilter[] = [];
  filteredBrands: BrandWithCount[] = [];

  priceRanges: PriceRange[] = [
    { label: '30 TL altı', value: '0-30', count: 0 },
    { label: '2000 - 5000 TL', value: '2000-5000', count: 0 },
    { label: '10000 - 20000 TL', value: '10000-20000', count: 0 },
    { label: '20000 TL üstü', value: '20000-100000', count: 0 }
  ];

  constructor(
    private brandService: BrandService,
    private filterService: ProductFilterService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.setupFilterMetrics();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private setupFilterMetrics(): void {
    this.filterService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        // Fiyat aralığı metriklerini güncelle
        this.priceRanges = this.priceRanges.map(range => ({
          ...range,
          count: this.calculatePriceRangeCount(products, range.value)
        }));

        // Marka metriklerini güncelle
        if (this.filteredBrands.length > 0) {
          this.filteredBrands = this.filteredBrands.map(brand => ({
            ...brand,
            count: this.calculateBrandCount(products, brand.brandName)
          }));
        }

        this.cdr.markForCheck();
      });
  }
  private calculatePriceRangeCount(products: any[], rangeValue: string): number {
    const [min, max] = rangeValue.split('-').map(Number);
    return products.filter(product => {
      const price = product.unitPrice;
      if (max) {
        return price >= min && price <= max;
      }
      return price >= min;
    }).length;
  }

  private calculateBrandCount(products: any[], brandName: string): number {
    return products.filter(product => 
      product.brand?.brandName.toLowerCase() === brandName.toLowerCase()
    ).length;
  }
  private updateBrandCounts(brandCounts: { [key: string]: number }) {
    this.filteredBrands = this.filteredBrands.map(brand => ({
      ...brand,
      count: brandCounts[brand.brandName] || 0
    }));
  }

  private updatePriceRangeCounts(priceRangeCounts: { [key: string]: number }) {
    this.priceRanges = this.priceRanges.map(range => ({
      ...range,
      count: priceRangeCounts[range.value] || 0
    }));
  }

  getBrands() {
    this.brandService.getAllBrands().subscribe(response => {
      this.brandList = response.data.map(brand => ({
        ...brand,
        count: 0
      }));
      this.filteredBrands = [...this.brandList];
    });
  }

  toggleBrandFilter(): void {
    this.isBrandFilterOpen = !this.isBrandFilterOpen;
  }

  filterBrands(): void {
    if (!this.brandSearchTerm) {
      this.filteredBrands = [...this.brandList];
    } else {
      this.filteredBrands = this.brandList.filter(brand =>
        brand.brandName.toLowerCase().includes(this.brandSearchTerm.toLowerCase())
      );
    }
  }

  togglePriceFilter(): void {
    this.isPriceFilterOpen = !this.isPriceFilterOpen;
  }

  onFilterBrandChange(brandName: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    if (isChecked) {
      this.selectedBrand.push(brandName);
      this.addActiveFilter('brand', brandName, brandName);
    } else {
      this.selectedBrand = this.selectedBrand.filter(b => b !== brandName);
      this.removeActiveFilter('brand', brandName);
    }
    
    this.productBrandChanged.emit(this.selectedBrand);
  }

  onFilterPriceChange(priceRange: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const range = this.priceRanges.find(r => r.value === priceRange);
    
    if (isChecked && range) {
      this.selectedPriceRanges.push(priceRange);
      this.addActiveFilter('price', priceRange, range.label);
    } else {
      this.selectedPriceRanges = this.selectedPriceRanges.filter(p => p !== priceRange);
      this.removeActiveFilter('price', priceRange);
    }
    
    this.productPriceChanged.emit(this.selectedPriceRanges);
  }

  private addActiveFilter(type: 'price' | 'brand', value: string, label: string): void {
    if (!this.activeFilters.some(f => f.value === value)) {
      this.activeFilters.push({ type, value, label });
    }
  }

  private removeActiveFilter(type: 'price' | 'brand', value: string): void {
    this.activeFilters = this.activeFilters.filter(f => 
      !(f.type === type && f.value === value)
    );
  }

  removeFilter(filter: ActiveFilter): void {
    const checkbox = document.getElementById(
      `${filter.type}-${filter.value}`
    ) as HTMLInputElement;
    
    if (checkbox) {
      checkbox.checked = false;
    }

    if (filter.type === 'price') {
      this.selectedPriceRanges = this.selectedPriceRanges.filter(p => p !== filter.value);
      this.productPriceChanged.emit(this.selectedPriceRanges);
    } else {
      this.selectedBrand = this.selectedBrand.filter(b => b !== filter.value);
      this.productBrandChanged.emit(this.selectedBrand);
    }

    this.removeActiveFilter(filter.type, filter.value);
  }

  clearAllFilters(): void {
    this.selectedPriceRanges = [];
    this.selectedBrand = [];
    this.activeFilters = [];
    this.productPriceChanged.emit([]);
    this.productBrandChanged.emit([]);

    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox: Element) => {
      (checkbox as HTMLInputElement).checked = false;
    });
  }

  get hasActiveFilters(): boolean {
    return this.activeFilters.length > 0;
  }
}