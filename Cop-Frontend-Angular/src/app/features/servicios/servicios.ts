import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasService } from '../../core/services/citas.service';
import { PacientesService } from '../../core/services/pacientes.service';
import { MedicosService } from '../../core/services/medicos.service';
import { ServiciosApiService } from '../../core/services/servicios.service';
import { Cita, Paciente, Medico, Servicio } from '../../core/models/cita.model';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class ServiciosComponent {
  modalOpen = false;
  loading = false;
  errorMsg = '';
  successMsg = '';

  servicios: Servicio[] = [];
  medicos: Medico[] = [];

  form = {
    servicioNombre: '',
    servicioId: 0,
    nombreCompleto: '',
    docIden: '',
    telefono: '',
    email: '',
    direccion: '',
    fecha: '',
    hora: '',
    medicoId: 0,
  };

  private readonly direccionDefault = 'Carrera 6h número 26 f 43 b/nuevo pioneros, Sincelejo, Magdalena';

  constructor(
    private citasSrv: CitasService,
    private pacientesSrv: PacientesService,
    private medicosSrv: MedicosService,
    private serviciosSrv: ServiciosApiService,
  ) {}

  solicitarCita(servicio: string) {
    this.errorMsg = '';
    this.successMsg = '';
    this.form.servicioNombre = servicio;
    this.modalOpen = true;
    this.loading = true;
    // Cargar servicios y médicos
    this.serviciosSrv.list().subscribe({
      next: (servs) => {
        this.servicios = servs;
        const match = servs.find(s => s.tipoServicio.toLowerCase().includes(servicio.toLowerCase()));
        this.form.servicioId = match ? match.idServicio : 0;
        this.medicosSrv.list().subscribe({
          next: (docs) => {
            this.medicos = docs;
            this.loading = false;
          },
          error: (e) => {
            this.errorMsg = 'No se pudo cargar médicos';
            this.loading = false;
          }
        });
      },
      error: (e) => {
        this.errorMsg = 'No se pudo cargar servicios';
        this.loading = false;
      }
    });
  }

  cerrarModal() {
    this.modalOpen = false;
  }

  agendar() {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.form.servicioId || !this.form.nombreCompleto || !this.form.fecha || !this.form.hora || !this.form.medicoId) {
      this.errorMsg = 'Completa servicio, nombre, fecha, hora y médico.';
      return;
    }
    this.loading = true;

    const nuevoPaciente: Paciente = {
      nombreCompleto: this.form.nombreCompleto,
      docIden: this.form.docIden,
      telefono: this.form.telefono,
      email: this.form.email,
      direccion: this.form.direccion || this.direccionDefault,
    };

    this.pacientesSrv.create(nuevoPaciente).subscribe({
      next: (p) => {
        const cita: Cita = {
          fecha: this.form.fecha,
          hora: this.form.hora,
          direccion: nuevoPaciente.direccion || this.direccionDefault,
          paciente: { idP: p.idP! },
          medico: { idMedico: this.form.medicoId },
          servicios: [{ idServicio: this.form.servicioId }],
        };
        this.citasSrv.create(cita).subscribe({
          next: (c) => {
            this.successMsg = '¡Cita agendada correctamente!';
            this.loading = false;
            // Reset parcial
            this.form.fecha = '';
            this.form.hora = '';
            this.form.telefono = '';
            this.form.email = '';
          },
          error: (e) => {
            this.errorMsg = 'Error creando la cita';
            this.loading = false;
          }
        });
      },
      error: (e) => {
        this.errorMsg = 'Error creando el paciente';
        this.loading = false;
      }
    });
  }
}
