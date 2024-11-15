

import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";



const routes :Routes=[
    {path:"",pathMatch:"full",component:CartSummaryComponent},

   {path:"cart-summary",component:CartSummaryComponent}
    
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CartModuleRouting { }