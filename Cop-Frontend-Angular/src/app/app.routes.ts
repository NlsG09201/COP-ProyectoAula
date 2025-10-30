import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./features/home/home').then(m => m.HomeComponent) },
  { path: 'servicios', loadComponent: () => import('./features/servicios/servicios').then(m => m.ServiciosComponent) },
  { path: 'nosotros', loadComponent: () => import('./features/nosotros/nosotros').then(m => m.NosotrosComponent) },
  { path: 'testimonios', loadComponent: () => import('./features/testimonios/testimonios').then(m => m.TestimoniosComponent) },
  { path: 'contacto', loadComponent: () => import('./features/contacto/contacto').then(m => m.ContactoComponent) },
  // Rutas avanzadas deshabilitadas temporalmente para compilar:
  // { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
  // { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  // { path: 'citas', canActivate: [authGuard], loadComponent: () => import('./features/citas/cita-page.component').then(m => m.CitaPageComponent) },
  // { path: 'odontograma', canActivate: [authGuard], loadComponent: () => import('./features/odontograma/odontograma-page.component').then(m => m.OdontogramaPageComponent) },
  { path: '**', redirectTo: '/home' }
];