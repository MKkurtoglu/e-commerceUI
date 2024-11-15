// src/app/core/preloading/custom-preloading-strategy.ts

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      const delay = route.data['preloadDelay'] || 0;
      return of(true).pipe(
        mergeMap(_ => new Observable(observer => {
          setTimeout(() => {
            observer.next(load());
            observer.complete();
          }, delay);
        }))
      );
    } else {
      return of(null);
    }
  }
}