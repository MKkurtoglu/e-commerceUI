

import { NgModule } from "@angular/core";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ControlProductComponent } from "../product/control-product/control-product.component";
import { authGuard } from "../../../core/guards/auth.guard";
import { ProductAddComponent } from "../product/product-add/product-add.component";
import { ProductEditComponent } from "../product/product-edit/product-edit.component";
import { AdminCategoriesComponent } from "../categories/admin-categories/admin-categories.component";
import { AddCategoryComponent } from "../categories/add-category/add-category.component";
import { EditCategoryComponent } from "../categories/edit-category/edit-category.component";
import { RouterModule, Routes } from "@angular/router";
import { AdminBrandComponent } from "../brand/admin-brand/admin-brand.component";
import { BrandAddComponent } from "../brand/brand-add/brand-add.component";
import { AdminModelComponent } from "../model/admin-model/admin-model.component";
import { AddModelComponent } from "../model/add-model/add-model.component";
import { EditModelComponent } from "../model/edit-model/edit-model.component";
import { DefaultLayoutComponent } from "../layout";
import { EditBrandComponent } from "../brand/edit-brand/edit-brand.component";
import { adminGuard } from "../../../core/guards/admin.guard";
import { CategoryImageComponent } from "../categories/category-image/category-image.component";

const routes: Routes = [
    {
      path: '',
      component: DefaultLayoutComponent,// Admin Layout
      children: [
        { path: '', component: DashboardComponent},
        {
          path: 'product',
          component: ControlProductComponent,
          children: [
            { path: 'product-add', component: ProductAddComponent },
            { path: 'product-edit', component: ProductEditComponent }
          ],
          
        },
        {
          path: 'categories',
          component: AdminCategoriesComponent,
          children: [
            { path: 'category-add', component: AddCategoryComponent },
            { path: 'category-edit/:categoryId', component: EditCategoryComponent },

            { path: 'category-image/:id', component: CategoryImageComponent},
          ],
        
        },
        {
          path: 'brand',
          component: AdminBrandComponent,
          children: [
            { path: 'brand-add', component: BrandAddComponent },
            { path: 'brand-edit/:brandId', component: EditBrandComponent }
          ],
          
        },
        {
          path: 'model',
          component: AdminModelComponent,
          children: [
            { path: 'model-add', component: AddModelComponent},
            { path: 'model-edit/:modelId', component: EditModelComponent }
          ],
          
        },
        { path: 'dashboard', component: DashboardComponent}
      ]
    }
  ];
  


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }