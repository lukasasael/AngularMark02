import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Appointment } from '../models/appointment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PatientsService {
  private readonly patients$ = new BehaviorSubject<Patient[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<Patient[]>('http://localhost:8080/api/patients').subscribe((patients) => {
      this.patients$.next(patients);
    });
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<any[]>('http://localhost:8080/api/patients').pipe(
      map((patients) =>
        patients.map((patient) => ({
          ...patient,
          casos: [],
          prontuario: [],
        })),
      ),
    );
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<any>(`http://localhost:8080/api/patients/${id}`).pipe(
      map((patient) => ({
        ...patient,
        casos: [],
        prontuario: [],
      })),
    );
  }

  createPatient(patient: {
    nome: string;
    idade: number;
    planoTratamento: string;
    dataInicio: string;
    historico: string;
  }) {
    return this.http.post('http://localhost:8080/api/patients', patient);
  }

  updatePatient(
    id: string,
    patient: {
      nome: string;
      idade: number;
      planoTratamento: string;
      dataInicio: string;
      historico: string;
    },
  ) {
    return this.http.put(`http://localhost:8080/api/patients/${id}`, patient);
  }

  addAppointment(patientId: string, entry: Appointment) {
    const patient = this.patients$.value.find((p) => p.id === patientId);
    if (!patient) return;

    patient.prontuario.unshift(entry); // mais recente primeiro
  }
}
