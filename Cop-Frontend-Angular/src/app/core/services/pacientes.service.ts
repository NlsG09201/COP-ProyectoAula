import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Paciente } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class PacientesService {
  private api = inject(ApiService);

  create(paciente: Paciente): Observable<Paciente> {
    return this.api.post<Paciente>('/pacientes', paciente);
  }

  list(): Observable<Paciente[]> {
    return this.api.get<Paciente[]>('/pacientes');
  }
}