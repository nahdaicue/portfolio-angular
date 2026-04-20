import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Si hay token, lo adjunta al header
  const authenticatedRequest = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    : req;

  return next(authenticatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el token expiró, logout automático
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};