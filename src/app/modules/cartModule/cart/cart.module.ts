import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@coreui/angular';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { CartModuleRouting } from './cart-module-routing';



@NgModule({
  declarations: [
    CartSummaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CartModuleRouting
  ],
  exports:[
    CartSummaryComponent
  ]
})
export class CartModule { }
