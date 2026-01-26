import { Routes } from '@angular/router';
import { AgendaPageComponent } from './pages/agenda-page.component';

export const AGENDA_ROUTES: Routes = [
  {
    path: '',
    component: AgendaPageComponent,
    data: { breadcrumb: 'Agenda' },
  },
];
