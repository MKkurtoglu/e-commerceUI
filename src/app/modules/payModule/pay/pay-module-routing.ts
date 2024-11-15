

import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";





const routes :Routes=[
//     {path:"",pathMatch:"full",component:CategoryComponent},

//    {path:"/category",component:CategoryComponent}
    
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PayRoutingModule { }