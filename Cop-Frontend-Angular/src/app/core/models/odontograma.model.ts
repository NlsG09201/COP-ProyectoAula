export interface Odontograma {
  idOdontograma?: number;
  fechaRegistro: string; // ISO date
  observacionesGenerales?: string;
  pacienteId: number;
  detalles: DetalleOdontograma[];
}

export interface DetalleOdontograma {
  idDetalle?: number;
  dienteId: number;
  estado: string; // "Cariado" | "Obturado" | "Sano" | etc.
  observacion?: string;
}

export interface Diente {
  idDiente?: number;
  codigoFDI: string;
  nombre: string;
}