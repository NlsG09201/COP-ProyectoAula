import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OdontogramaService } from '../../core/services/odontograma.service';
import { Diente, Odontograma, DetalleOdontograma } from '../../core/models/odontograma.model';

@Component({
  selector: 'app-odontograma-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  styles: [`
    .grid { display:grid; grid-template-columns: repeat(8, 1fr); gap: 8px; }
    .tooth { background:#fff; border-radius:8px; padding:8px; text-align:center; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
  `],
  template: `
    <h2>Registro de Odontograma</h2>
    <section style="display:grid; grid-template-columns: 2fr 1fr; gap: 24px;">
      <mat-card>
        <mat-card-title>Chart Dental</mat-card-title>
        <mat-card-content>
          <div class="grid">
            <div class="tooth" *ngFor="let d of dientes" (click)="seleccionarDiente(d)">
              <div><strong>{{d.codigoFDI}}</strong></div>
              <div style="font-size:12px">{{d.nombre}}</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Detalle</mat-card-title>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="guardar()">
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>ID Paciente</mat-label>
              <input matInput type="number" formControlName="pacienteId">
            </mat-form-field>
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Diente seleccionado</mat-label>
              <input matInput [value]="dienteSeleccionado?.codigoFDI || ''" disabled>
            </mat-form-field>
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Estado</mat-label>
              <mat-select formControlName="estado">
                <mat-option value="Sano">Sano</mat-option>
                <mat-option value="Cariado">Cariado</mat-option>
                <mat-option value="Obturado">Obturado</mat-option>
                <mat-option value="Ausente">Ausente</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Observación</mat-label>
              <input matInput formControlName="observacion">
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="!dienteSeleccionado || form.invalid">Registrar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `
})
export class OdontogramaPageComponent {
  private fb = inject(FormBuilder);
  private svc = inject(OdontogramaService);

  dientes: Diente[] = [];
  dienteSeleccionado?: Diente;

  form = this.fb.group({
    pacienteId: [null, Validators.required],
    estado: ['Sano', Validators.required],
    observacion: ['']
  });

  constructor(){
    this.svc.dientes().subscribe({ next: d => this.dientes = d, error: _ => this.dientes = [] });
  }

  seleccionarDiente(d: Diente){
    this.dienteSeleccionado = d;
  }

  guardar(){
    if(!this.dienteSeleccionado || this.form.invalid) return;
    const detalle: DetalleOdontograma = {
      dienteId: this.dienteSeleccionado.idDiente!,
      estado: this.form.value.estado!,
      observacion: this.form.value.observacion || ''
    };
    const odonto: Odontograma = {
      pacienteId: this.form.value.pacienteId!,
      fechaRegistro: new Date().toISOString().slice(0,10),
      detalles: [detalle]
    };
    this.svc.guardar(odonto).subscribe({ next: _ => this.form.reset(), error: err => console.error(err) });
  }
}