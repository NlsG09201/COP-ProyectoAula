import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CitasService } from '../../core/services/citas.service';
import { Cita } from '../../core/models/cita.model';

@Component({
  selector: 'app-cita-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  template: `
    <h2>Gestión de Citas</h2>
    <section style="display:grid; grid-template-columns: 1fr 1fr; gap: 24px;">
      <form [formGroup]="form" (ngSubmit)="guardar()">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Fecha (YYYY-MM-DD)</mat-label>
          <input matInput formControlName="fecha" placeholder="2025-10-22">
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Hora (HH:mm)</mat-label>
          <input matInput formControlName="hora" placeholder="14:30">
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Dirección</mat-label>
          <input matInput formControlName="direccion" placeholder="Calle 123 #45-67">
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>ID Paciente</mat-label>
          <input matInput type="number" formControlName="pacienteId">
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>ID Médico</mat-label>
          <input matInput type="number" formControlName="medicoId">
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Guardar</button>
      </form>

      <div>
        <table mat-table [dataSource]="citas" class="mat-elevation-z2" style="width:100%">
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef> Fecha </th>
            <td mat-cell *matCellDef="let c"> {{c.fecha}} </td>
          </ng-container>
          <ng-container matColumnDef="hora">
            <th mat-header-cell *matHeaderCellDef> Hora </th>
            <td mat-cell *matCellDef="let c"> {{c.hora}} </td>
          </ng-container>
          <ng-container matColumnDef="direccion">
            <th mat-header-cell *matHeaderCellDef> Dirección </th>
            <td mat-cell *matCellDef="let c"> {{c.direccion}} </td>
          </ng-container>
          <ng-container matColumnDef="pacienteId">
            <th mat-header-cell *matHeaderCellDef> Paciente </th>
            <td mat-cell *matCellDef="let c"> {{c.pacienteId}} </td>
          </ng-container>
          <ng-container matColumnDef="medicoId">
            <th mat-header-cell *matHeaderCellDef> Médico </th>
            <td mat-cell *matCellDef="let c"> {{c.medicoId}} </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </section>
  `
})
export class CitaPageComponent {
  private citasService = inject(CitasService);
  private fb = inject(FormBuilder);

  citas: Cita[] = [];
  displayedColumns = ['fecha','hora','direccion','pacienteId','medicoId'];

  form = this.fb.group({
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    direccion: ['', Validators.required],
    pacienteId: [null, Validators.required],
    medicoId: [null, Validators.required],
  });

  constructor(){
    this.cargar();
  }

  cargar(){
    this.citasService.list().subscribe({
      next: data => this.citas = data,
      error: () => this.citas = []
    });
  }

  guardar(){
    if(this.form.invalid) return;
    const cita: Cita = this.form.value as any;
    this.citasService.create(cita).subscribe({
      next: _ => { this.form.reset(); this.cargar(); },
      error: err => console.error(err)
    });
  }
}