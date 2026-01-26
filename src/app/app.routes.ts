import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { loginGuard } from './core/auth/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./core/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/authenticated-shell/authenticated-shell.component').then(
        (m) => m.AuthenticatedShellComponent
      ),
    data: { breadcrumb: 'Início' },
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./features/patients/patients.routes').then((m) => m.PATIENTS_ROUTES),
      },
      {
        path: 'agenda',
        loadChildren: () => import('./features/agenda/agenda.routes').then((m) => m.AGENDA_ROUTES),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes').then((m) => m.SETTINGS_ROUTES),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
