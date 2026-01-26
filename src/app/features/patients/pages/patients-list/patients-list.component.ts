import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PatientsFacade } from '../../facade/patients.facade';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
  selector: 'app-patients-list',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent {
  private patientsFacade = inject(PatientsFacade);

  readonly patients$ = this.patientsFacade.patients$;
  readonly displayedColumns = ['nome', 'plano', 'data', 'editar'];
}
