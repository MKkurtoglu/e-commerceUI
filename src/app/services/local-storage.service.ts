import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getItemLocal(key:string):string{
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  addLocalStorage(key:string,token:string,){
    localStorage.setItem(key,token)
  }

  deleteLocalStorage(key:string){
    localStorage.removeItem(key)
  }
}
