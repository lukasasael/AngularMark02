import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsFacade } from '../../facade/patients.facade';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BreadcrumbService } from '../../../../shared/ui/breadcrumb.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-patient-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent {
  private patientsFacade = inject(PatientsFacade);

  readonly patient$ = this.patientsFacade.selectedPatient$;
  readonly prontuario$ = this.patientsFacade.prontuario$;
  private fb = inject(FormBuilder);
  private facade = inject(PatientsFacade);
  private breadcrumb = inject(BreadcrumbService);

  private patientForBreadcrumb = toSignal(this.patient$, { initialValue: null });

  constructor() {
    effect(() => {
      const patient = this.patientForBreadcrumb();
      if (!patient) return;

      this.breadcrumb.setLastLabel(patient.nome);
    });
  }

  showForm = false;

  form = this.fb.nonNullable.group({
    date: [''],
    procedure: [''],
    notes: [''],
    professional: [''],
  });

  toggleForm() {
    this.showForm = !this.showForm;
  }

  save() {
    if (this.form.invalid) return;

    this.facade.addAppointment(this.form.getRawValue());
    this.form.reset();
    this.showForm = false;
  }
}
