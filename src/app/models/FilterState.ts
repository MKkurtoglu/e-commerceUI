export interface FilterState {
    brands: string[];
    priceRanges: string[];
    searchTerm: string;
    sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
  }