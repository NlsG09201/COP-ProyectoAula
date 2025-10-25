import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { UiService } from './shared/services/ui.service';
import { AuthService } from './core/services/auth.service';
import { IaAgentWidgetComponent } from './shared/components/ia-agent-widget/ia-agent-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, IaAgentWidgetComponent],
  template: `
    <header class="header bg-white shadow" *ngIf="!isDashboardSection">
      <div class="container mx-auto flex justify-between items-center p-4">
        <div class="logo flex items-center">
          <img src="assets/IMG/Logo.png" alt="Logo Centro Odontológico y Psicológico" class="h-16 w-auto rounded-lg shadow-md">
          <span class="ml-4 text-2xl font-bold text-gray-800">COP</span>
        </div>
        <!-- Botón hamburguesa -->
        <button 
          id="menu-toggle" 
          class="block md:hidden text-3xl text-gray-700 focus:outline-none" 
          aria-label="Abrir menú"
          (click)="toggleMobileMenu()">
          <i class="fas fa-bars"></i>
        </button>
        <nav class="navigation" id="main-nav">
          <ul 
            id="main-menu" 
            class="flex flex-col md:flex-row md:space-x-6 bg-white md:bg-transparent absolute md:static top-full left-0 w-full md:w-auto shadow md:shadow-none z-50 md:z-auto"
            [class.hidden]="isMobileMenuHidden"
            [class.md:flex]="true">
            <li><a routerLink="/home" class="nav-link block px-4 py-2 md:p-0" [class.active]="isActiveRoute('/home')" (click)="closeMobileMenu()">Inicio</a></li>
            <li><a routerLink="/servicios" class="nav-link block px-4 py-2 md:p-0" [class.active]="isActiveRoute('/servicios')" (click)="closeMobileMenu()">Servicios</a></li>
            <li><a routerLink="/nosotros" class="nav-link block px-4 py-2 md:p-0" [class.active]="isActiveRoute('/nosotros')" (click)="closeMobileMenu()">Nosotros</a></li>
            <li><a routerLink="/testimonios" class="nav-link block px-4 py-2 md:p-0" [class.active]="isActiveRoute('/testimonios')" (click)="closeMobileMenu()">Testimonios</a></li>
            <li><a routerLink="/contacto" class="nav-link block px-4 py-2 md:p-0" [class.active]="isActiveRoute('/contacto')" (click)="closeMobileMenu()">Contacto</a></li>
            <li><a routerLink="/login" class="nav-link block px-4 py-2 md:p-0" [class.active]="isActiveRoute('/login')" (click)="closeMobileMenu()">Acceso</a></li>
            <li *ngIf="isAuthenticated"><a routerLink="/dashboard" class="nav-link block px-4 py-2 md:p-0" [class.active]="isActiveRoute('/dashboard')" (click)="closeMobileMenu()">Dashboard</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-outlet></router-outlet>
      <!-- Mostrar el widget de IA solo en páginas públicas -->
      <app-ia-agent-widget *ngIf="!isDashboardSection"></app-ia-agent-widget>
    </main>

    <footer class="footer" *ngIf="!isDashboardSection">
      <div class="container mx-auto">
        <p>&copy; 2024 Centro Odontológico y Psicológico. Todos los derechos reservados.</p>
        <p>Carrera 6h número 26 f 43 b/nuevo pioneros, Sincelejo, Magdalena, Colombia</p>
      </div>
    </footer>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  isMobileMenuHidden = true;
  currentRoute = '';
  title = 'Cop-Frontend-Angular';
  get isAuthenticated() { return this.auth.isAuthenticated(); }

  // Determina si estamos en la sección de dashboard (rutas protegidas)
  get isDashboardSection(): boolean {
    const protectedPrefixes = ['/dashboard', '/citas', '/odontograma', '/login'];
    return protectedPrefixes.some(p => this.currentRoute.startsWith(p));
  }

  constructor(private router: Router, private uiService: UiService, private auth: AuthService) {}

  ngOnInit() {
    // Initialize UI functionality
    this.uiService.setupScrollAnimations();
    this.uiService.setupFocusOutline();
    this.uiService.setupClickOutsideHandler();
    
    // Escuchar cambios de ruta para actualizar el enlace activo
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  toggleMobileMenu() {
    this.uiService.toggleMobileMenu();
  }

  closeMobileMenu() {
    this.uiService.closeMobileMenu();
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute === route || (this.currentRoute === '/' && route === '/home');
  }
}