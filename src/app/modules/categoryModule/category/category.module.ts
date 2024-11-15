import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../categorycomp/category.component';
import { SharedModule } from '../../sharedModule/shared/shared.module';
import { CategoryRoutingModule } from './category-routing';
import { CategoryStoriesComponent } from '../category-stories/category-stories.component';



@NgModule({
  declarations: [CategoryComponent,
    CategoryStoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule
  ],
  exports:[
    CategoryComponent,
    CategoryStoriesComponent
  ]
})
export class CategoryModule { }
