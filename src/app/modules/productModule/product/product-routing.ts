

import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { ProductComponent } from "../product-component/product.component";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { combineLatest } from "rxjs";


const routes :Routes=[
  {
    path: "",
    children: [
      {
        path: "products",
        component: ProductComponent
      },
      {
        path: "category/:categoryId",
        component: ProductComponent
      },
      {
        path: ":id", // 'products' prefix'ini kaldırdık
        component: ProductDetailComponent
      }
    ]
  }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule { }