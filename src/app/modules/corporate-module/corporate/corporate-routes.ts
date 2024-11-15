import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { CorporateComponent } from "../corporatecomponent/corporate.component";
import { ContactComponent } from "../contact/contact.component";




const routes :Routes=[
    { 
        path: '', 
        redirectTo: 'about', 
        pathMatch: 'full' 
      },
      {
        path: 'about',
        component: CorporateComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      }
    ];
    



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CorporateModuleRouting { }