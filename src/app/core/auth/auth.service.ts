import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const TOKEN_STORAGE_KEY = 'token';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private readonly loggedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLogged$ = this.loggedSubject.asObservable();

  login(email: string, password: string) {
    const body: LoginRequest = { email, password };

    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, body)
      .pipe(
        tap((response) => {
          localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
          this.loggedSubject.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.loggedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_STORAGE_KEY);
  }
}