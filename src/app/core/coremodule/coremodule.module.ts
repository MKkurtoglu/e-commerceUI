// src/app/core/core.module.ts

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { CustomPreloadingStrategy } from '../Preloading/custom-preloading-strategy';

@NgModule({
  providers: [
    CustomPreloadingStrategy,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    
  ]
})
export class CoremoduleModule {
  constructor(@Optional() @SkipSelf() parentModule: CoremoduleModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
