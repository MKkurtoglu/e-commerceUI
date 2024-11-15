import { Product } from "./product";

export interface FavoriteItem {
    favoriteId: number;
    productId: number;
    product: Product;
  }