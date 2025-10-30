export interface Cita {
  idCita?: number;
  fecha: string; // ISO date YYYY-MM-DD
  hora: string;  // HH:MM
  direccion: string;
  paciente: { idP: number };
  medico: { idMedico: number };
  servicios: { idServicio: number }[];
}

export interface Paciente {
  idP?: number;
  docIden?: string;
  nombreCompleto: string;
  telefono?: string;
  email?: string;
  direccion?: string;
}

export interface Medico {
  idMedico: number;
  nombreCompleto: string;
  telefono?: string;
  email?: string;
  certificado?: string;
  servicios?: Servicio[];
}

export interface Servicio {
  idServicio: number;
  tipoServicio: string;
}