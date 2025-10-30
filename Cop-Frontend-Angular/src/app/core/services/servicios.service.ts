import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Servicio } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class ServiciosApiService {
  private api = inject(ApiService);

  list(): Observable<Servicio[]> {
    return this.api.get<Servicio[]>('/servicios');
  }
}