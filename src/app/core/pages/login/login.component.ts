import { Component } from '@angular/core';
import { AuthFacade } from '../../auth/auth.facade';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  login() {
    this.authFacade.login();
    this.router.navigate(['/patients']);
  }
}
