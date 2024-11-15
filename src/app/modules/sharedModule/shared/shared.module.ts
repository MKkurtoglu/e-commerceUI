import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { FilterPipePipe } from '../pipes/filter-pipe.pipe';
import { VatAddedPipe } from '../pipes/vat-added.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartModule } from '../../cartModule/cart/cart.module';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductPriceFilterPipe } from '../pipes/product-price-filter.pipe';
import { BrandFilterPipe } from '../pipes/brand-filter.pipe';
import { CategoryFilterPipe } from '../pipes/category-filter.pipe';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { SafePipe } from '../pipes/safe.pipe';
// import { CoreUIModule } from '@coreui/angular'; 


@NgModule({
  declarations: [
    NavComponent,
    FilterPipePipe,
    VatAddedPipe,
    ProductFilterComponent,
    ProductPriceFilterPipe,
    BrandFilterPipe,
    CategoryFilterPipe,
    TopNavbarComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule  ,
    RouterModule,
    // CoreUIModule ,
  CartModule],
  exports:[
    NavComponent,
    FilterPipePipe,
    VatAddedPipe,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ProductPriceFilterPipe,
    ProductFilterComponent,
    BrandFilterPipe,
    CategoryFilterPipe,
    TopNavbarComponent,
    SafePipe




  ]
})
export class SharedModule { }
