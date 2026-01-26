import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Patient } from '../models/patient.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private readonly patients: Patient[] = [
    {
      id: '1',
      nome: 'João Silva',
      idade: 34,
      planoTratamento: 'Implante dentário',
      historico: 'Sem complicações',
      casos: ['Implante'],
      dataInicio: '2024-01-10',
      prontuario: [
        {
          id: 'a1',
          date: '2024-01-10',
          procedure: 'Consulta inicial',
          notes: 'Avaliação geral e planejamento do tratamento.',
          professional: 'Dr. Carlos Mendes',
        },
        {
          id: 'a2',
          date: '2024-01-25',
          procedure: 'Implante dentário',
          notes: 'Implante realizado com sucesso. Paciente orientado.',
          professional: 'Dr. Carlos Mendes',
        },
      ],
    },

    {
      id: '2',
      nome: 'Maria Souza',
      idade: 28,
      planoTratamento: 'Ortodontia',
      historico: 'Tratamento em andamento',
      casos: ['Aparelho fixo'],
      dataInicio: '2024-03-05',
      prontuario: [],
    },
    {
      id: '3',
      nome: 'Carlos Pereira',
      idade: 45,
      planoTratamento: 'Prótese fixa',
      historico: 'Extração prévia realizada',
      casos: ['Prótese', 'Extração'],
      dataInicio: '2023-11-22',
      prontuario: [],
    },
    {
      id: '4',
      nome: 'Ana Paula Lima',
      idade: 31,
      planoTratamento: 'Clareamento dental',
      historico: 'Paciente com sensibilidade leve',
      casos: ['Clareamento'],
      dataInicio: '2024-02-14',
      prontuario: [],
    },
    {
      id: '5',
      nome: 'Ricardo Alves',
      idade: 52,
      planoTratamento: 'Tratamento de canal',
      historico: 'Dor intensa relatada inicialmente',
      casos: ['Endodontia'],
      dataInicio: '2023-10-03',
      prontuario: [],
    },
    {
      id: '6',
      nome: 'Fernanda Rocha',
      idade: 26,
      planoTratamento: 'Ortodontia estética',
      historico: 'Uso de alinhadores invisíveis',
      casos: ['Alinhadores'],
      dataInicio: '2024-04-01',
      prontuario: [],
    },
    {
      id: '7',
      nome: 'Lucas Martins',
      idade: 19,
      planoTratamento: 'Avaliação ortodôntica',
      historico: 'Primeira consulta',
      casos: ['Avaliação'],
      dataInicio: '2024-05-10',
      prontuario: [],
    },
    {
      id: '8',
      nome: 'Patrícia Gomes',
      idade: 38,
      planoTratamento: 'Periodontia',
      historico: 'Gengivite moderada',
      casos: ['Raspagem', 'Profilaxia'],
      dataInicio: '2023-12-18',
      prontuario: [],
    },
    {
      id: '9',
      nome: 'Eduardo Nunes',
      idade: 60,
      planoTratamento: 'Implante dentário',
      historico: 'Paciente hipertenso (controlado)',
      casos: ['Implante'],
      dataInicio: '2023-09-07',
      prontuario: [],
    },
    {
      id: '10',
      nome: 'Juliana Costa',
      idade: 35,
      planoTratamento: 'Facetas de porcelana',
      historico: 'Objetivo estético',
      casos: ['Facetas'],
      dataInicio: '2024-01-29',
      prontuario: [],
    },
  ];

  getPatients(): Observable<Patient[]> {
    return of(this.patients).pipe(delay(500));
  }

  //of() simula http delay() simula latencia

  getPatientById(id: string): Observable<Patient | undefined> {
    return of(this.patients.find((p) => p.id === id)).pipe(delay(300));
  }
  addAppointment(patientId: string, entry: Appointment) {
    const patient = this.patients.find((p) => p.id === patientId);
    if (!patient) return;

    patient.prontuario.unshift(entry); // mais recente primeiro
  }
}
