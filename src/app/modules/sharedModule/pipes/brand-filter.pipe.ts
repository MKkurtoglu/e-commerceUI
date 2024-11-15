import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../models/product';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {
  transform(value: Product[], selectedBrand: string[] | null): Product[] {
    // Eğer selectedBrand null, undefined ya da boş ise tüm veriyi döndür
    if (!selectedBrand || selectedBrand.length === 0) {
      return value;
    }

    // Marka seçilmişse, her bir seçili marka için filtre uygula
    return value.filter(product =>
      selectedBrand.some(brand =>
        product.brand.brandName.toLocaleLowerCase().includes(brand.toLocaleLowerCase())
      )
    );
  }
}
