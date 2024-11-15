import { inject } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CanActivateFn, Router } from '@angular/router';
import { first, map } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { jwtDecode } from 'jwt-decode';

// guard routeing e gidip oradaki mevcut route'lara şart gibi koyacağız




export const authGuard: CanActivateFn = (route, state) => {

  
const authService = inject(AuthService); // login kontrolü
  const toastrService = inject(ToastrService); 
  const router = inject(Router); // login olmaayn kişiyi yönlendirme yapmak içiin 
  const localStorage = inject(LocalStorageService)
  // ---  route parametresi --- :route parametresini, 
  //kullanıcının erişmeye çalıştığı belirli rota hakkında 
  //bilgi almak için kullanabilirsiniz. Örneğin, belirli bir parametreye göre erişim izni verebilirsiniz.


  //  ---  state parametresini  ---  , mevcut rotanın durumunu ve geçmişini anlamak için kullanabilirsiniz. 
  //Örneğin, kullanıcıyı belirli bir rota durumuna göre yönlendirebilir veya farklı işlemler yapabilirsiniz.
//   if(authService.isAuthenticated()){
//     return true
//   }
//   else{
// router.navigate(["auth/login"]);
// toastrService.info("Sisteme Giriş Yapmalısınız..")
// return false
//   }

return authService.isLoggedIn$.asObservable().pipe(
  first(), // İlk değeri almak için kullanılır
  map(isLoggedIn => {
    if (isLoggedIn) {
      // Eğer kullanıcı giriş yaptıysa token'ı kontrol et
      const token = localStorage.getItemLocal("token"); // Token'ı AuthService'den al
      if (token) {
        const decodedToken = jwtDecode<any>(token); // Token'ı çöz
        const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        
        if (roles && roles.includes('customer')) {
          return true; // Admin yetkisine sahipse erişime izin ver
        } else {
          authService.logout();
          toastrService.error('Bu sayfaya sadece müşteriler erişebilir.');
          router.navigate(['auth/login']); // Yetkili değilse yetkisiz sayfasına yönlendir
          return false;
        }
      }
    }

    // Giriş yapılmamışsa login sayfasına yönlendir
    authService.logout();
    router.navigate(['auth/login']);
    toastrService.info('Ancak müşteriler giriş yapabilir.');
    return false; // Erişim engellenir
  })
);
};
