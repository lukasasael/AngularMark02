import { Routes } from '@angular/router';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { patientDetailResolver } from './resolvers/patient-detail.resolver';
import { PatientCreateComponent } from './pages/patient-create/patient-create.component';
import { authGuard } from '../../core/auth/auth.guard';
import { PatientFormComponent } from './ui/patient-form.component';

export const PATIENTS_ROUTES: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Pacientes' },
    children: [
      {
        path: '',
        component: PatientsListComponent,
      },
      {
        path: 'new',
        component: PatientCreateComponent,
        data: { breadcrumb: 'Novo paciente' },
        canActivate: [authGuard],
      },
      {
        path: ':id',
        component: PatientDetailComponent,
        data: { breadcrumb: 'Detalhes do Paciente', dynamicBreadcrumb: true },
        resolve: {
          patient: patientDetailResolver,
        },
      },
      {
        path: ':id/edit', // 👈 ROTA DE EDIÇÃO
        component: PatientFormComponent,
        data: { breadcrumb: 'Editar paciente'},
        resolve: {
          patient: patientDetailResolver,
        },
      },
    ],
  },
];
