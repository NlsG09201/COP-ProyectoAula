import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Cita } from '../../core/models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitasService {
  private api = inject(ApiService);

  list(): Observable<Cita[]> {
    return this.api.get<Cita[]>('/citas');
  }

  create(cita: Cita): Observable<Cita> {
    return this.api.post<Cita>('/citas', cita);
  }
}