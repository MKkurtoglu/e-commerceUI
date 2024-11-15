import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Public layout
import { CustomPreloadingStrategy } from './core/Preloading/custom-preloading-strategy';
import { DefaultLayoutComponent } from './modules/adminModule/layout';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';


const routes: Routes = [
  // Public Layout
  { 
    path: '', component: PublicLayoutComponent, // Public layout
    children: [
      // Ana sayfa (ürün sayfası) hemen yüklensin
      { path: '', pathMatch: 'full', redirectTo: 'products/category/' },
      
      // Ürün sayfasına preloading ve gecikme ekleyelim
      { 
        path: 'products', 
        loadChildren: () => import('../app/modules/productModule/product/product.module').then(m => m.ProductModule), 
        data: { preload: true, preloadDelay: 3000 } // 3 saniye sonra preloading başlasın
      },
      { 
        path: 'corporate', 
        loadChildren: () => import('../app/modules/corporate-module/corporate/corporate-module.module')
          .then(m => m.CorporateModuleModule), 
        data: { preload: true, preloadDelay: 3000 } 
      },
      // Kategori sayfasına preloading
      { 
        path: 'category', 
       
        loadChildren: () => import('../app/modules/categoryModule/category/category.module').then(m => m.CategoryModule), 
        data: { preload: true } // Hemen preload yapılsın
      },
      
      // Kullanıcı modülü için preloading
      { 
        path: 'user', 
        loadChildren: () => import('../app/modules/userModule/user/user.module').then(m => m.UserModule), 
        data: { preload: true, preloadDelay: 5000 } // 5 saniye gecikme ile preload
      },
      
      // Ödeme modülüne preloading uygulamayalım
      { 
        path: 'pay', 
        loadChildren: () => import('../app/modules/payModule/pay/pay.module').then(m => m.PayModule) 
      },

      // Auth modülü için preloading yapmayalım
      
    ]
  },
  { 
    path: 'auth', 
    loadChildren: () => import('../app/modules/authModule/auth/auth.module').then(m => m.AuthModule) 
  },
  // Admin Layout
  { 
    path: 'admin', 
    
    // canActivate: [adminGuard],
    loadChildren: () => import('../app/modules/adminModule/admin/admin.module').then(m => m.AdminModule) 
  },

  // Wildcard rota (herhangi bir yanlış URL girildiğinde ana sayfaya yönlendirme)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
