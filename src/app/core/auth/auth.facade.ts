import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private authService = inject(AuthService);
  isLogged$ = this.authService.isLogged$;

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
