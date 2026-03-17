import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientsFacade } from '../../facade/patients.facade';
import { PatientFormComponent } from '../../ui/patient-form.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-patient-edit-page',
  imports: [
    CommonModule,
    MatCardModule,
    PatientFormComponent,
  ],
  templateUrl: './patient-edit.component.html',
})
export class PatientEditPage {
  private facade = inject(PatientsFacade);
  private router = inject(Router);

  readonly patient$ = this.facade.selectedPatient$;

  save(
    data: {
      nome: string;
      idade: number;
      planoTratamento: string;
      dataInicio: string;
    }
  ) {
    const patient = this.facade.getSelectedPatientSnapshot();
    if (!patient) return;

    this.facade.updatePatient(patient.id, data);
    this.router.navigate(['/patients', patient.id]);
  }
}
