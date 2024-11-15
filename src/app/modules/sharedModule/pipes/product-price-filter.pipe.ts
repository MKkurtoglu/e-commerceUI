import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../models/product';

@Pipe({
  name: 'productPriceFilter'
})
export class ProductPriceFilterPipe implements PipeTransform {

  transform(products: Product[], selectedRanges: string[]): Product[] {
    if (!products || selectedRanges.length === 0) return products;

    // Filtreyi uygularken, seçilen tüm aralıklara uyan ürünleri döndürüyoruz.
    return products.filter(product => {
      // Fiyat aralıkları üzerinde döngü oluşturup, herhangi birine uyup uymadığını kontrol ediyoruz.
      return selectedRanges.some(range => {
        const [min, max] = range.split('-').map(Number); // '0-1000' => [0, 1000]
        return product.unitPrice >= min && (max ? product.unitPrice<= max : true); // Üst limit yoksa true olarak kabul et
      });
    });
  }

}
