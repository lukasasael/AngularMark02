import { Component, effect, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PatientsFacade } from '../../facade/patients.facade';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
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
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent implements OnInit, OnDestroy {
  private readonly patientsFacade = inject(PatientsFacade);
  private readonly breadcrumb = inject(BreadcrumbService);
  private readonly route = inject(ActivatedRoute);

  readonly patient$ = this.patientsFacade.selectedPatient$;

  private readonly patientForBreadcrumb = toSignal(this.patient$, {
    initialValue: null,
  });

  constructor() {
    effect(() => {
      const patient = this.patientForBreadcrumb();
      if (!patient) return;

      this.breadcrumb.setLastLabel(patient.nome);
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patientsFacade.selectPatient(id);
    }
  }

  ngOnDestroy(): void {
    this.patientsFacade.clearSelectedPatient();
  }
}