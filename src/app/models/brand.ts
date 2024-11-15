import { Model } from "./model";
import { Product } from "./product";

export interface Brand {
  brandId: number;
  brandName: string;
  isDeleted: boolean;
  models?: Model[] | null;  // Opsiyonel olarak modeller
  products?: Product[] | null;  // Opsiyonel olarak ürünler
  images?: string[] | null;  // Opsiyonel olarak resim yolları
}
