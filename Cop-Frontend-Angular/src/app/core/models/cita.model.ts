export interface Cita {
  idCita?: number;
  fecha: string; // ISO date
  hora: string;  // HH:mm
  direccion: string;
  pacienteId: number;
  medicoId: number;
  serviciosIds?: number[];
}