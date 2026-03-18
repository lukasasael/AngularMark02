import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
export class PatientEditPage implements OnInit, OnDestroy {
  private facade = inject(PatientsFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly patient$ = this.facade.selectedPatient$;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.facade.selectPatient(id);
    }
  }

  ngOnDestroy(): void {
    this.facade.clearSelectedPatient();
  }

  save(data: {
    nome: string;
    idade: number;
    planoTratamento: string;
    dataInicio: string;
    historico: string;
  }): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.facade.updatePatient(id, data).subscribe({
      next: () => this.router.navigate(['/patients', id]),
      error: (err) => console.error('Erro ao atualizar paciente', err),
    });
  }
}