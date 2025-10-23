import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  template: `
    <div class="grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
      <mat-card>
        <mat-card-title>Citas</mat-card-title>
        <mat-card-content>
          Gestiona la agenda de pacientes.
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/citas">Abrir</button>
        </mat-card-actions>
      </mat-card>
      <mat-card>
        <mat-card-title>Odontograma</mat-card-title>
        <mat-card-content>
          Registra el estado dental detallado.
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="accent" routerLink="/odontograma">Abrir</button>
        </mat-card-actions>
      </mat-card>
      <mat-card>
        <mat-card-title>Indicadores</mat-card-title>
        <mat-card-content>
          Próximas funcionalidades de reportes.
        </mat-card-content>
        <mat-card-actions>
          <button mat-stroked-button disabled>Próximamente</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class DashboardComponent {}