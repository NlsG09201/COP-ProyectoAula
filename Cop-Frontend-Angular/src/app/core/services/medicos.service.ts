import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Medico } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class MedicosService {
  private api = inject(ApiService);

  list(): Observable<Medico[]> {
    return this.api.get<Medico[]>('/medicos');
  }
}