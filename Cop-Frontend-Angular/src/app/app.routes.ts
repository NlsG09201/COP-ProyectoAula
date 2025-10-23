import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'citas',
    loadComponent: () => import('./features/citas/cita-page.component').then(m => m.CitaPageComponent)
  },
  {
    path: 'odontograma',
    loadComponent: () => import('./features/odontograma/odontograma-page.component').then(m => m.OdontogramaPageComponent)
  },
  { path: '**', redirectTo: '' }
];