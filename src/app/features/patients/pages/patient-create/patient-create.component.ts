import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsFacade } from '../../facade/patients.facade';
import { Patient } from '../../models/patient.model';
import { PatientFormComponent } from '../../ui/patient-form.component';
import { MatCard } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-patient-create',
  imports: [PatientFormComponent, MatCard],
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss'],
})
export class PatientCreateComponent {
  private facade = inject(PatientsFacade);
  private router = inject(Router);

  create(data: { nome: string; idade: number; planoTratamento: string; dataInicio: string }) {
    this.facade.createPatient(data).subscribe({
      next: () => {
        this.router.navigate(['/patients']);
      },
      error: (err) => {
        console.error('Erro ao criar paciente', err);
      },
    });
  }
}
