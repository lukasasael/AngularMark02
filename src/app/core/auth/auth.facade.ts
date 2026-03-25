import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private authService = inject(AuthService);
  isLogged$ = this.authService.isLogged$;

  login(email: string, password: string) {
    return this.authService.login(email, password);
  }

  logout() {
    this.authService.logout();
  }
}
