import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, switchMap, map, of } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { Patient } from '../models/patient.model';
import { PatientsService } from '../services/patients.service';

@Injectable({ providedIn: 'root' })
export class PatientsFacade {
  private patientsService = inject(PatientsService);

  private readonly selectedPatientId$ = new BehaviorSubject<string | null>(null);

  // 👇 NOVO: cache interno (não exposto)
  private _selectedPatient?: Patient;

  readonly patients$: Observable<Patient[]> = this.patientsService.getPatients();

  readonly selectedPatient$: Observable<Patient | undefined> = this.selectedPatientId$.pipe(
    distinctUntilChanged(),
    switchMap((id) => {
      if (!id) {
        return of(undefined);
      }

      return this.patientsService.getPatientById(id);
    }),
    map((patient) => {
      this._selectedPatient = patient;
      return patient;
    }),
  );

  readonly prontuario$: Observable<Appointment[]> = this.selectedPatient$.pipe(
    map((patient) => patient?.prontuario ?? []),
  );

  // 🔹 comandos (intenção)
  selectPatient(id: string) {
    this.selectedPatientId$.next(id);
  }

  clearSelectedPatient() {
    this.selectedPatientId$.next(null);
    this._selectedPatient = undefined; // 👈 limpeza correta
  }

  // 👇 NOVO: leitura síncrona (opcional, segura)
  getSelectedPatientSnapshot(): Patient | undefined {
    return this._selectedPatient;
  }

  createPatient(data: Pick<Patient, 'nome' | 'idade' | 'planoTratamento' | 'dataInicio'>) {
    const patient = {
      ...data,
      historico: '',
    };

    return this.patientsService.createPatient(patient);
  }

  updatePatient(
    id: string,
    data: Pick<Patient, 'nome' | 'idade' | 'planoTratamento' | 'dataInicio'>,
  ) {
    return this.patientsService.updatePatient(id, {
      ...data,
      historico: this._selectedPatient?.historico ?? '',
    });
  }

  addAppointment(entry: Omit<Appointment, 'id'>) {
    const current = this.selectedPatientId$.value;
    if (!current) return;

    this.patientsService.addAppointment(current, {
      ...entry,
      id: crypto.randomUUID(),
    });
  }
}
