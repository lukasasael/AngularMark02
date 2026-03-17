import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { MOCK_PATIENTS } from '../mocks/patients.mock';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class PatientsService {
  private readonly patients$ = new BehaviorSubject<Patient[]>(MOCK_PATIENTS);

  getPatients(): Observable<Patient[]> {
    return this.patients$.asObservable();
  }

  getPatientById(id: string) {
    return this.patients$.pipe(map((patients) => patients.find((p) => p.id === id)));
  }

  createPatient(patient: Patient) {
    this.patients$.next([...this.patients$.value, patient]);
  }

  updatePatient(id: string, changes: Partial<Patient>) {
    this.patients$.next(this.patients$.value.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  }
  addAppointment(patientId: string, entry: Appointment) {
    const patient = this.patients$.value.find((p) => p.id === patientId);
    if (!patient) return;

    patient.prontuario.unshift(entry); // mais recente primeiro
  }
}
