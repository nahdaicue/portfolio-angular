import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = 'http://localhost:8080';

  private http = inject(HttpClient);
  private router = inject(Router);

  login(userName: string, password: string) {
    return this.http.post<{ token: string }>(`${this.API_URL}/api/auth/login`, { userName, password })
      .pipe(
        tap(response => this.saveToken(response.token))
      );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}