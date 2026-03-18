import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PatientsService {
  private readonly apiUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((patients) =>
        patients.map((patient) => ({
          ...patient,
          casos: patient.casos ?? [],
          prontuario: patient.prontuario ?? [],
        })),
      ),
    );
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((patient) => ({
        ...patient,
        casos: patient.casos ?? [],
        prontuario: patient.prontuario ?? [],
      })),
    );
  }

  createPatient(patient: {
    nome: string;
    idade: number;
    planoTratamento: string;
    dataInicio: string;
    historico: string;
  }): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
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
  ): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }
}