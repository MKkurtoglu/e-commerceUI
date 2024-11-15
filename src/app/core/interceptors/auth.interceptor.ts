import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Token'ı localStorage'dan al (veya başka bir kaynaktan)
    let tokene = '';
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      tokene = localStorage.getItem('token')!;
    }
    // const token = localStorage.getItem('token');

    // Yeni başlığı eklemek için isteği kopyala
    const authReq = req.clone({
      headers: req.headers.set('Authorization', "Bearer "+tokene)
    });

    // Orijinal isteğin yerine kopyalanmış isteği geç
    return next.handle(authReq);
  }
}
