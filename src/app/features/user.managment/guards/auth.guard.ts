import { inject } from '@angular/core';
import { CanActivateFn, MaybeAsync, Router, UrlTree } from '@angular/router';
import { take, map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TranslationService } from "../../../shared/services/translation.service";

export const authGuard : CanActivateFn = () : MaybeAsync<boolean | UrlTree>  => {
  //console.log("CanActivateFn start");
  const router = inject(Router);
  const authService = inject(AuthService);
  const translationService = inject(TranslationService);
  const lang = translationService.language();

  return authService.UserIsAuthenticated().pipe(
    take(1),
    map(isAuth => {
      //console.log("after call UserIsAuthenticated", isAuth); 
      return isAuth
        ? true
        : router.createUrlTree([lang, 'login']);
    }),
    catchError(() =>
      of(router.createUrlTree([lang, 'login']))
    )
  );
};