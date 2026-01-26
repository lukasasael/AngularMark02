import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import { PatientsService } from '../services/patients.service';
import { Patient } from '../models/patient.model';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class PatientsFacade {
  private patientsService = inject(PatientsService);

  // 🔹 estado interno
  private readonly selectedPatientId$ = new BehaviorSubject<string | null>(null);

  // 🔹 streams públicos
  readonly patients$: Observable<Patient[]> = this.patientsService.getPatients();

  readonly selectedPatient$: Observable<Patient | undefined> = this.selectedPatientId$.pipe(
    distinctUntilChanged(),
    switchMap((id) => {
      if (!id) {
        return [undefined];
      }
      return this.patientsService.getPatientById(id);
    })
  );
  readonly prontuario$: Observable<Appointment[]> = this.selectedPatient$.pipe(
    map((patient) => patient?.prontuario ?? [])
  );

  // 🔹 comandos (intenção)
  selectPatient(id: string) {
    this.selectedPatientId$.next(id);
  }

  clearSelectedPatient() {
    this.selectedPatientId$.next(null);
  }
  addAppointment(entry: Omit<Appointment, 'id'>) {
  const current = this.selectedPatientId$.value;
  if (!current) return;

  this.patientsService.addAppointment(current, {
    ...entry,
    id: crypto.randomUUID(), // 👈 alternativa nativa moderna
  });
}
}
