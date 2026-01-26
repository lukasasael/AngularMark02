import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthFacade } from '../../auth/auth.facade';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-authenticated-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    BreadcrumbComponent,
  ],
  templateUrl: './authenticated-shell.component.html',
  styleUrls: ['./authenticated-shell.component.scss'],
})
export class AuthenticatedShellComponent {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  readonly breadcrumbs$ = inject(BreadcrumbComponent).breadcrumbs$;
  logout() {
    this.authFacade.logout();
    this.router.navigate(['/login']);
  }
}
