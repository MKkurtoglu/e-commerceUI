import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

import { first, map, Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../../services/local-storage.service';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService); // Auth servisini inject et
  const toastrService = inject(ToastrService); 
  const router = inject(Router); // Router'ı inject et
  const localStorage = inject(LocalStorageService)
  // Admin login durumu için gözlemciyi kullan
  return authService.isAdminLoggedIn$.asObservable().pipe(
    first(), // İlk değeri almak için kullanılır
    map(isAdminLoggedIn => {
      if (isAdminLoggedIn) {
        // Eğer kullanıcı giriş yaptıysa token'ı kontrol et
        const token = localStorage.getItemLocal("token"); // Token'ı AuthService'den al
        if (token) {
          const decodedToken = jwtDecode<any>(token); // Token'ı çöz
          const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          
          if (roles && roles.includes('admin')) {
            return true; // Admin yetkisine sahipse erişime izin ver
          } else {
            authService.logout();
            toastrService.error('Bu sayfaya sadece adminler erişebilir.');
            router.navigate(['auth/login']); // Yetkili değilse yetkisiz sayfasına yönlendir
            return false;
          }
        }
      }

      // Giriş yapılmamışsa login sayfasına yönlendir
      authService.logout();
      router.navigate(['auth/login']);
      toastrService.info('Sisteme ancak adminler giriş yapabilir.');
      return false; // Erişim engellenir
    })
  );
};
