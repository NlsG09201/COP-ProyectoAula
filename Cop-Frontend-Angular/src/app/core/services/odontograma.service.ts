import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Odontograma, Diente } from '../../core/models/odontograma.model';

@Injectable({ providedIn: 'root' })
export class OdontogramaService {
  private api = inject(ApiService);

  dientes(): Observable<Diente[]> { return this.api.get<Diente[]>('/dientes'); }
  guardar(odonto: Odontograma): Observable<Odontograma> { return this.api.post<Odontograma>('/odontogramas', odonto); }
}