import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product-component/product.component';
import { SharedModule } from '../../sharedModule/shared/shared.module';
import { ProductRoutingModule } from './product-routing';
import { CategoryModule } from '../../categoryModule/category/category.module';
import { CategoryComponent } from '../../categoryModule/categorycomp/category.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProductRoutingModule,
    CategoryModule,
    NgxPaginationModule
  ],
  exports: [
    ProductComponent,
    ProductDetailComponent
  ]
})
export class ProductModule { }
