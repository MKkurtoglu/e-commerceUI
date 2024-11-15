import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateComponent } from '../corporatecomponent/corporate.component';
import { ContactComponent } from '../contact/contact.component';
import { CorporateModuleRouting } from './corporate-routes';
import { SharedModule } from '../../sharedModule/shared/shared.module';
import { SafePipe } from '../../sharedModule/pipes/safe.pipe';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    CorporateComponent,
    ContactComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
   CorporateModuleRouting,
   RouterModule,
  ],
  exports:[
    CorporateComponent,
    ContactComponent
  ]
})
export class CorporateModuleModule { }
