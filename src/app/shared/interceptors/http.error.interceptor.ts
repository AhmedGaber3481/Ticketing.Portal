import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // Handle response status codes globally
      if (error.status === 401) {
        // Unauthorized → redirect to login
        router.navigate(['/login']);
      }

      if (error.status === 403) {
        console.error('Access forbidden');
      }

      if (error.status === 500) {
        console.error('Server error');
      }

      return throwError(() => error);
    })
  );
};