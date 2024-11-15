import { Category } from "./category";
import { Model } from "./model";
import { Brand } from "./brand";  // Yeni eklenen brand model

export interface Product {
  productId: number;
  productName: string;
  categoryId: number;
  modelId: number | null;  // API'den gelebilecek null değerler için
  brandId: number;
  unitsInStock: number;
  unitPrice: number;
  imagePaths: string[];  // Birden fazla resim yolu için dizi
  primaryImagePath?: string | null; // Opsiyonel olarak primary image
  category?: Category;  // Category ilişkisini ekleyin
  model?: Model | null;  // Model ilişkisini ekleyin ve null olabilir
  brand?: Brand;  // Brand ilişkisi için opsiyonel olarak ekleyin
}
