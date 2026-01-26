import { Appointment } from './appointment.model';

export interface Patient {
  id: string;
  nome: string;
  idade: number;
  planoTratamento: string;
  historico: string;
  casos: string[];
  dataInicio: string;

  prontuario: Appointment[]; 
}
