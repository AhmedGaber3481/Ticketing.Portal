// import { inject, Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
// import { AuthService } from "../services/auth.service";
// import { catchError, map, Observable, of, take } from "rxjs";
// import { TranslationService } from "../../../shared/services/translation.service";

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const authService = inject(AuthService);
//   const translationService = inject(TranslationService);

//   const status = authService.authStatus();
//   const lang = translationService.language();

//   console.log('Authentication status', status);

//   // If already resolved
//   if (status === 'Authenticated') {
//     return true;
//   }

//   if (status === 'NotAuthenticated') {
//     return router.parseUrl('/' + lang + '/login');
//   }

//   // If loading → check server
//   return authService.UserIsAuthenticated().pipe(
//     map(res => {
//       const isAuth = !!res;

//       console.log('Authentication status2', status);
//       authService.authStatus.set(
//         isAuth ? 'Authenticated' : 'NotAuthenticated'
//       );

//       console.log(isAuth, 'Authenticated');

//       return isAuth
//         ? true
//         : router.parseUrl('/' + lang + '/login');
//     }),
//     catchError(() => {
//       console.log('Authentication status2 error', status);
//       return of(router.parseUrl('/' + lang + '/login'));
//     })
//   );
// };
// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate{

//   constructor(private router: Router, private authService: AuthService, private translationService: TranslationService){

//   }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
//   console.log("CanActivateFn start");
//   // const router = inject(Router);
//   // const authService = inject(AuthService);
//   // const translationService = inject(TranslationService);
//   const lang = this.translationService.language();
  
//   return this.authService.UserIsAuthenticated().pipe(take(1),
//     map(isAuth => {
//       console.log("after call UserIsAuthenticated", isAuth);
//       this.authService.authStatus.set(
//         isAuth ? 'Authenticated' : 'NotAuthenticated'
//       );

//       return isAuth
//         ? true
//         : this.router.createUrlTree([lang, 'login']);
//     }),
//     catchError(() =>
//       of(this.router.createUrlTree([lang, 'login']))
//     )
//   );
//   }
  
// }

// export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   console.log("CanActivateFn start");
//   const router = inject(Router);
//   const authService = inject(AuthService);
//   const translationService = inject(TranslationService);
//   const lang = translationService.language();
  
//   return authService.UserIsAuthenticated().pipe(take(1),
//     map(isAuth => {
//       console.log("after call UserIsAuthenticated", isAuth);
//       authService.authStatus.set(
//         isAuth ? 'Authenticated' : 'NotAuthenticated'
//       );

//       return isAuth
//         ? true
//         : router.createUrlTree([lang, 'login']);
//     }),
//     catchError(() =>
//       of(router.createUrlTree([lang, 'login']))
//     )
//   );
// };

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { take, map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TranslationService } from "../../../shared/services/translation.service";

export const authGuard = () => {
  console.log("CanActivateFn start");

  const router = inject(Router);
  const authService = inject(AuthService);
  const translationService = inject(TranslationService);

  const lang = translationService.language();

  return authService.UserIsAuthenticated().pipe(
    take(1),
    map(isAuth => {
      console.log("after call UserIsAuthenticated", isAuth);
      
      return isAuth
        ? true
        : router.createUrlTree([lang, 'login']);
    }),
    catchError(() =>
      of(router.createUrlTree([lang, 'login']))
    )
  );
};