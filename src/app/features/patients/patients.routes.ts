import { Routes } from '@angular/router';
import { PatientsListComponent } from './pages/patients-list/patients-list.component';
import { PatientDetailComponent } from './pages/patient-detail/patient-detail.component';
import { patientDetailResolver } from './resolvers/patient-detail.resolver';

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
        path: ':id',
        component: PatientDetailComponent,
        data: { breadcrumb: 'Detalhes do Paciente', dynamicBreadcrumb: true },
        resolve: {
          patient: patientDetailResolver,
        },
      },
    ],
  },
];
