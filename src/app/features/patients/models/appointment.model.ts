export interface Appointment {
  id: string;
  date: string;              // ISO
  procedure: string;         // Ex: "Implante"
  notes: string;             // Evolução clínica
  professional: string;      // Dentista responsável
}
