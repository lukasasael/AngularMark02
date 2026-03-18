import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, distinctUntilChanged } from 'rxjs';
import { Patient } from '../models/patient.model';
import { PatientsService } from '../services/patients.service';

@Injectable({ providedIn: 'root' })
export class PatientsFacade {
  private readonly selectedPatientId$ = new BehaviorSubject<string | null>(null);
  readonly patients$: Observable<Patient[]>;

  readonly selectedPatient$: Observable<Patient | null> = this.selectedPatientId$.pipe(
    distinctUntilChanged(),
    switchMap((id) => {
      if (!id) return of(null);
      return this.patientsService.getPatientById(id);
    }),
  );

  constructor(private patientsService: PatientsService) {
    this.patients$ = this.patientsService.getPatients();
  }

  selectPatient(id: string): void {
    this.selectedPatientId$.next(id);
  }

  clearSelectedPatient(): void {
    this.selectedPatientId$.next(null);
  }

  createPatient(data: {
    nome: string;
    idade: number;
    planoTratamento: string;
    dataInicio: string;
    historico: string;
  }): Observable<Patient> {
    return this.patientsService.createPatient(data);
  }

  updatePatient(
    id: string,
    data: {
      nome: string;
      idade: number;
      planoTratamento: string;
      dataInicio: string;
      historico: string;
    },
  ): Observable<Patient> {
    return this.patientsService.updatePatient(id, data);
  }
}