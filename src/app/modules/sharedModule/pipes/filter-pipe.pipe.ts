import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../models/product';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value:Product[], textFilter: string): Product[] {
    textFilter=textFilter.toLocaleLowerCase();
    
    return textFilter? value.filter((p:Product)=>p.productName.toLocaleLowerCase().indexOf(textFilter)!==-1):value;
  }

}
