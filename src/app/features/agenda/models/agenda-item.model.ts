export interface AgendaItem {
  id: string;
  date: string;      // 2026-01-15
  time: string;      // 09:00
  patientName: string;
  procedure: string;
  status: 'Agendado' | 'Confirmado' | 'Atendido' | 'Cancelado';
}
