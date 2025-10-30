import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

interface Cita { idCita?: number; fecha: string; hora: string; direccion: string; paciente?: any; medico?: any; servicios?: any[]; }

@Component({
  standalone: true,
  selector: 'app-citas-page',
  imports: [CommonModule, FormsModule],
  template: `
    <h2 class="text-2xl font-semibold mb-2">Gestión de Citas</h2>
    <p class="text-slate-600 mb-4">Lista, filtra y organiza las citas agendadas.</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="field"><label>Desde</label><input type="date" [(ngModel)]="filtroDesde"></div>
      <div class="field"><label>Hasta</label><input type="date" [(ngModel)]="filtroHasta"></div>
      <div class="field"><label>Buscar por paciente / médico</label><input placeholder="Texto" [(ngModel)]="filtroTexto"></div>
    </div>
    <div class="flex gap-2 mb-4">
      <button class="btn" (click)="aplicarFiltros()">Aplicar filtros</button>
      <button class="btn secondary" (click)="resetFiltros()">Limpiar</button>
    </div>

    <div *ngIf="error" class="text-red-700 mb-2">{{ error }}</div>
    <div class="overflow-x-auto rounded-lg shadow">
      <table *ngIf="citasFiltradas.length" class="min-w-full bg-white">
        <thead class="bg-blue-50">
          <tr>
            <th class="px-4 py-2 text-left">ID</th>
            <th class="px-4 py-2 text-left cursor-pointer" (click)="ordenarPor('fecha')">Fecha</th>
            <th class="px-4 py-2 text-left cursor-pointer" (click)="ordenarPor('hora')">Hora</th>
            <th class="px-4 py-2 text-left">Paciente</th>
            <th class="px-4 py-2 text-left">Médico</th>
            <th class="px-4 py-2 text-left">Servicio(s)</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of citasFiltradas" class="border-t">
            <td class="px-4 py-2">{{ c.idCita }}</td>
            <td class="px-4 py-2">{{ c.fecha }}</td>
            <td class="px-4 py-2">{{ c.hora }}</td>
            <td class="px-4 py-2">{{ c.paciente?.nombreCompleto || c.paciente?.idP }}</td>
            <td class="px-4 py-2">{{ c.medico?.nombreCompleto || c.medico?.idMedico }}</td>
            <td class="px-4 py-2">{{ formatServicios(c) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div *ngIf="!citasFiltradas.length && !loading">No hay citas registradas.</div>
  `,
})
export class CitasPageComponent {
  citas: Cita[] = [];
  citasFiltradas: Cita[] = [];
  loading = false;
  error = '';
  filtroDesde = '';
  filtroHasta = '';
  filtroTexto = '';

  constructor(private api: ApiService) { this.load(); }

  load() {
    this.loading = true; this.error = '';
    this.api.get<Cita[]>('/citas').subscribe({
      next: (data) => { this.citas = data; this.citasFiltradas = [...data]; this.loading = false; },
      error: () => { this.error = 'Error cargando citas'; this.loading = false; }
    });
  }

  formatServicios(c: Cita): string {
    return (c.servicios || [])
      .map((s: any) => s?.tipoServicio || s?.idServicio)
      .filter((v: any) => !!v)
      .join(', ');
  }

  aplicarFiltros() {
    const desde = this.filtroDesde ? new Date(this.filtroDesde) : null;
    const hasta = this.filtroHasta ? new Date(this.filtroHasta) : null;
    const txt = (this.filtroTexto || '').toLowerCase();
    this.citasFiltradas = this.citas.filter(c => {
      const fechaValida = (() => {
        if (!desde && !hasta) return true;
        const f = new Date(c.fecha);
        if (desde && f < desde) return false;
        if (hasta && f > hasta) return false;
        return true;
      })();
      const textoValido = txt ? (
        (c.paciente?.nombreCompleto || '').toLowerCase().includes(txt) ||
        (c.medico?.nombreCompleto || '').toLowerCase().includes(txt) ||
        (c.direccion || '').toLowerCase().includes(txt)
      ) : true;
      return fechaValida && textoValido;
    });
  }

  resetFiltros() { this.filtroDesde = this.filtroHasta = this.filtroTexto = ''; this.citasFiltradas = [...this.citas]; }

  ordenarPor(campo: 'fecha'|'hora') {
    const parse = (v: any) => campo === 'fecha' ? new Date(v).getTime() : (''+v);
    this.citasFiltradas.sort((a,b) => (parse(a[campo]) > parse(b[campo]) ? 1 : -1));
  }
}