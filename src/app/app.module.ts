import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomDirectiveDirective } from './custom-directive.directive';
import { ProductComponent } from './modules/productModule/product-component/product.component';
import { CategoryComponent } from './modules/categoryModule/categorycomp/category.component';
import { NavComponent } from './modules/sharedModule/nav/nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { VatAddedPipe } from './modules/sharedModule/pipes/vat-added.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipePipe } from './modules/sharedModule/pipes/filter-pipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartSummaryComponent } from './modules/cartModule/cart-summary/cart-summary.component';
import { ProductAddComponent } from './modules/adminModule/product/product-add/product-add.component';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { DashboardComponent } from './modules/adminModule/dashboard/dashboard.component';
import { ControlProductComponent } from './modules/adminModule/product/control-product/control-product.component';
import { ProductEditComponent } from './modules/adminModule/product/product-edit/product-edit.component';
import { AdminCategoriesComponent } from './modules/adminModule/categories/admin-categories/admin-categories.component';
import { LoginComponent } from './modules/authModule/login/login.component';
import { SharedModule } from './modules/sharedModule/shared/shared.module';
import { AuthModule } from './modules/authModule/auth/auth.module';
import { ProductModule } from './modules/productModule/product/product.module';
import { UserModule } from './modules/userModule/user/user.module';
import { CoremoduleModule } from './core/coremodule/coremodule.module';
import { CategoryModule } from './modules/categoryModule/category/category.module';
import { IconSetService } from '@coreui/icons-angular';
// import { CoreUIModule } from '@coreui/angular'; // CoreUIModule'u buraya ekle

import {
  cilSpeedometer,
  cilDrop,
  cilPencil,
  cilPuzzle,
  cilCursor,
  cilNotes,
  cilChartPie,
  cilStar,
  cilBell,
  cilCalculator,
  cilDescription,
  cilSun,
  cilMoon,
  cilContrast,
  cilEnvelopeOpen,
  cilTask,
  cilCommentSquare,
  cilUser,
  cilSettings,
  cilCreditCard,
  cilFile,
  cilLockLocked,
  cilAccountLogout,
  cilMenu,
  cilList,
  cilLoop, cilSignLanguage
} from '@coreui/icons';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { EditProfileComponent } from './modules/userModule/edit-profile/edit-profile.component';
import { EditProfileImageComponent } from './modules/userModule/edit-profile-image/edit-profile-image.component';
import { BrandFilterPipe } from './modules/sharedModule/pipes/brand-filter.pipe';
import { CategoryFilterPipe } from './modules/sharedModule/pipes/category-filter.pipe';
import { SearchComponent } from './modules/sharedModule/search/search.component';
import { FooterComponent } from './modules/sharedModule/footer/footer.component';
import { TopNavbarComponent } from './modules/sharedModule/top-navbar/top-navbar.component';

import { ProductDetailComponent } from './modules/productModule/product-detail/product-detail.component';
import { ProductImageComponent } from './modules/adminModule/product/product-image/product-image.component';
import { CategoryImageComponent } from './modules/adminModule/categories/category-image/category-image.component';
import { CategoryStoriesComponent } from './modules/categoryModule/category-stories/category-stories.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SafePipe } from './modules/sharedModule/pipes/safe.pipe';




@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    EditProfileComponent,
    EditProfileImageComponent,
    
    SearchComponent,
    FooterComponent,
    
    
    
    
    
    
    
    
   
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    ProductModule,
    UserModule,
    CategoryModule,
    CoremoduleModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Bildirimin ekranda kalma süresi (milisaniye cinsinden)
      positionClass: 'toast-bottom-right', // Bildirimin ekranda gösterileceği konum
      preventDuplicates: true, // Aynı mesajların tekrarını engeller
      closeButton: true, // Bildirime kapatma butonu ekler
      progressBar: true, // İlerleme çubuğu gösterir
      progressAnimation: 'increasing', // İlerleme çubuğu animasyonu ('increasing' veya 'decreasing')
      newestOnTop: true, // Yeni bildirimleri üstte gösterir
      tapToDismiss: true // Bildirime tıklanarak kapatılmasını sağlar
    }),
     // Interceptor'un fonksiyon olarak sağlandığı yer
  ],
  
  providers: [
    provideClientHydration(),
   provideHttpClient(withInterceptorsFromDi()),
   IconSetService
    // provideHttpClient(withInterceptors([authInterceptor]))

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  /**
   *
   */
  constructor(private iconSet: IconSetService) {
    iconSet.icons = {
      cilSpeedometer,
      cilDrop,
      cilPencil,
      cilPuzzle,
      cilCursor,
      cilNotes,
      cilChartPie,
      cilStar,
      cilBell,
      cilCalculator,
      cilDescription,
      cilSun,
      cilMoon,
      cilContrast,
      cilEnvelopeOpen,
      cilTask,
      cilCommentSquare,
      cilUser,
      cilSettings,
      cilCreditCard,
      cilFile,
      cilLockLocked,
      cilAccountLogout,
      cilMenu,
      cilList,
      cilLoop, cilSignLanguage
    };
  }
}
