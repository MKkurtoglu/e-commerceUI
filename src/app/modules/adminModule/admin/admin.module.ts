import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routes';
import { ProductAddComponent } from '../product/product-add/product-add.component';
import { ProductEditComponent } from '../product/product-edit/product-edit.component';
import { ProductComponent } from '../../productModule/product-component/product.component';
import { ControlProductComponent } from '../product/control-product/control-product.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from '../layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule, BadgeModule, BreadcrumbModule, DropdownModule, SharedModule } from '@coreui/angular';
import {
  ButtonModule,
  GridModule,
  HeaderModule,
  NavModule,
  SidebarModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterModule } from '@angular/router';
import { AddModelComponent } from '../model/add-model/add-model.component';
import { EditModelComponent } from '../model/edit-model/edit-model.component';
import { AdminModelComponent } from '../model/admin-model/admin-model.component';
import { BrandAddComponent } from '../brand/brand-add/brand-add.component';
import { AdminBrandComponent } from '../brand/admin-brand/admin-brand.component';
import { EditBrandComponent } from '../brand/edit-brand/edit-brand.component';
import { AdminCategoriesComponent } from '../categories/admin-categories/admin-categories.component';
import { AddCategoryComponent } from '../categories/add-category/add-category.component';
import { EditCategoryComponent } from '../categories/edit-category/edit-category.component';
import { CategoryImageComponent } from '../categories/category-image/category-image.component';
import { ProductImageComponent } from '../product/product-image/product-image.component';



@NgModule({
  declarations: [
    ProductAddComponent,
    ProductEditComponent,
    ControlProductComponent,
    DashboardComponent,
    DefaultLayoutComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    AddModelComponent,
    EditModelComponent,
    AdminModelComponent,
    BrandAddComponent,
    AdminBrandComponent,
    EditBrandComponent,
    AdminCategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CategoryImageComponent,
    ProductImageComponent
  ],
  imports: [
    
    AdminRoutingModule,
    SharedModule,
    CommonModule,
    GridModule,
    ButtonModule,
    IconModule,
    BadgeModule,       
    HeaderModule,
    NavModule,
    SidebarModule,
    BreadcrumbModule,
    DropdownModule,
    ReactiveFormsModule,
    RouterModule,
    NgScrollbarModule,
    AvatarModule
  ],
  exports:[
    DefaultFooterComponent,DefaultLayoutComponent,
    
    
    DefaultHeaderComponent,
  ]
})
export class AdminModule { }
