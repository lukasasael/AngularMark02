import { Injectable } from '@angular/core';
import { AgendaItem } from '../models/agenda-item.model';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private agenda: AgendaItem[] = [
    {
      id: '1',
      date: '2026-01-15',
      time: '09:00',
      patientName: 'João Silva',
      procedure: 'Implante dentário',
      status: 'Confirmado',
    },
    {
      id: '2',
      date: '2026-01-15',
      time: '10:30',
      patientName: 'Maria Souza',
      procedure: 'Ortodontia',
      status: 'Agendado',
    },
    {
      id: '3',
      date: '2026-01-15',
      time: '14:00',
      patientName: 'Ana Paula',
      procedure: 'Avaliação',
      status: 'Atendido',
    },
  ];

  getAgendaByDate(date: string) {
    return of(this.agenda.filter((item) => item.date === date));
  }
}
