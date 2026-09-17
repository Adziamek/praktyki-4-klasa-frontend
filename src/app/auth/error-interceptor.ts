import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth-service/auth-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.removeToken();
        router.navigate(['/login']);
      } else if (error.status === 0) {
        console.error('Nie można połączyć się z serwerem. Sprawdź, czy backend działa.');
      } else if (error.status >= 500) {
        console.error('Błąd serwera:', error.error?.detail ?? error.message);
      }

      return throwError(() => error);
    })
  );
};