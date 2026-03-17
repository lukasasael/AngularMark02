import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsFacade } from '../../facade/patients.facade';
import { PatientFormComponent } from '../../ui/patient-form.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-patient-edit-page',
  imports: [CommonModule, MatCardModule, PatientFormComponent],
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss'],
})
export class PatientEditPage implements OnInit {
  private facade = inject(PatientsFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly patient$ = this.facade.selectedPatient$;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.facade.selectPatient(id);
    }
  }

  save(data: { nome: string; idade: number; planoTratamento: string; dataInicio: string }) {
    const patient = this.facade.getSelectedPatientSnapshot();
    if (!patient) return;

    this.facade.updatePatient(patient.id, data).subscribe({
      next: () => {
        this.router.navigate(['/patients', patient.id]);
      },
      error: (err) => {
        console.error('Erro ao atualizar paciente', err);
      },
    });
  }
}
