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
    <header class="fixed w-full top-0 bg-white/90 backdrop-blur-sm border-b border-slate-100 shadow-sm z-50" *ngIf="!isDashboardSection">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex justify-between items-center py-2 md:py-3">
          <!-- Logo y Nombre -->
          <div class="flex justify-start">
            <a href="/" class="flex items-center">
              <img src="assets/IMG/Logo.png" alt="Logo Centro Odontológico y Psicológico" 
                   class="h-7 w-auto md:h-8 object-contain rounded-md">
              <span class="ml-2 text-lg font-semibold text-slate-800 hidden sm:block">COP</span>
            </a>
          </div>

          <!-- Navegación Desktop -->
          <nav class="hidden md:flex items-center space-x-1">
            <a routerLink="/home" 
               class="nav-link px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200" 
               [class.active]="isActiveRoute('/home')">Inicio</a>
            <a routerLink="/servicios" 
               class="nav-link px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200" 
               [class.active]="isActiveRoute('/servicios')">Servicios</a>
            <a routerLink="/nosotros" 
               class="nav-link px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200" 
               [class.active]="isActiveRoute('/nosotros')">Nosotros</a>
            <a routerLink="/testimonios" 
               class="nav-link px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200" 
               [class.active]="isActiveRoute('/testimonios')">Testimonios</a>
            <a routerLink="/contacto" 
               class="nav-link px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200" 
               [class.active]="isActiveRoute('/contacto')">Contacto</a>
            <a *ngIf="isAuthenticated" 
               routerLink="/dashboard" 
               class="nav-link ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm" 
               [class.active]="isActiveRoute('/dashboard')">Dashboard</a>
          </nav>

          <!-- Botón Móvil -->
          <div class="md:hidden">
            <button type="button" 
                    (click)="toggleMobileMenu()"
                    class="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span class="sr-only">Abrir menú</span>
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Menú Móvil -->
      <div class="md:hidden" 
           [class.hidden]="isMobileMenuHidden"
           id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-slate-100">
          <a routerLink="/home" 
             class="block px-3 py-2 text-base font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-blue-600"
             [class.active]="isActiveRoute('/home')"
             (click)="closeMobileMenu()">Inicio</a>
          <a routerLink="/servicios" 
             class="block px-3 py-2 text-base font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-blue-600"
             [class.active]="isActiveRoute('/servicios')"
             (click)="closeMobileMenu()">Servicios</a>
          <a routerLink="/nosotros" 
             class="block px-3 py-2 text-base font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-blue-600"
             [class.active]="isActiveRoute('/nosotros')"
             (click)="closeMobileMenu()">Nosotros</a>
          <a routerLink="/testimonios" 
             class="block px-3 py-2 text-base font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-blue-600"
             [class.active]="isActiveRoute('/testimonios')"
             (click)="closeMobileMenu()">Testimonios</a>
          <a routerLink="/contacto" 
             class="block px-3 py-2 text-base font-medium text-slate-700 rounded-md hover:bg-slate-50 hover:text-blue-600"
             [class.active]="isActiveRoute('/contacto')"
             (click)="closeMobileMenu()">Contacto</a>
          <a *ngIf="isAuthenticated" 
             routerLink="/dashboard" 
             class="block px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
             [class.active]="isActiveRoute('/dashboard')"
             (click)="closeMobileMenu()">Dashboard</a>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-outlet></router-outlet>
      <!-- Mostrar el widget de IA solo en páginas públicas -->
      <app-ia-agent-widget *ngIf="!isDashboardSection"></app-ia-agent-widget>
    </main>

    <!-- Footer Médico Profesional -->
    <footer class="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white relative overflow-hidden" *ngIf="!isDashboardSection">
      <!-- Elementos decorativos de fondo -->
      <div class="absolute inset-0 opacity-5">
        <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-footer-pattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="7.5" cy="7.5" r="0.8" fill="currentColor"/>
              <path d="M6 7.5h3M7.5 6v3" stroke="currentColor" stroke-width="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-footer-pattern)"/>
        </svg>
      </div>
      
      <div class="relative max-w-screen-xl mx-auto px-4 py-16">
        <!-- Sección principal del footer -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          <!-- Información del Centro Médico -->
          <div class="lg:col-span-1">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <div>
                <span class="text-xl font-bold text-white">COP</span>
                <p class="text-sm text-blue-200">Centro Médico Integral</p>
              </div>
            </div>
            <p class="text-slate-300 mb-6 leading-relaxed">
              Más de 5 años brindando atención médica especializada en odontología y psicología con tecnología de vanguardia y un enfoque humano.
            </p>
            
            <!-- Certificaciones -->
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-sm text-slate-300">Centro Médico Certificado</span>
            </div>
          </div>
          
          <!-- Servicios Médicos -->
          <div>
            <h4 class="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              Servicios Médicos
            </h4>
            <ul class="space-y-3">
              <li><a routerLink="/servicios" fragment="odontologia" class="text-slate-300 hover:text-blue-300 transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                Odontología General
              </a></li>
              <li><a routerLink="/servicios" fragment="psicologia" class="text-slate-300 hover:text-purple-300 transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                Psicología Clínica
              </a></li>
              <li><a routerLink="/servicios" fragment="ortodoncia" class="text-slate-300 hover:text-emerald-300 transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                Ortodoncia
              </a></li>
              <li><a routerLink="/citas" class="text-blue-300 hover:text-blue-200 transition font-semibold flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Agendar Cita
              </a></li>
            </ul>
          </div>
          
          <!-- Horarios y Contacto -->
          <div>
            <h4 class="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Horarios de Atención
            </h4>
            <div class="space-y-3 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-slate-300">Lunes - Viernes</span>
                <span class="text-white font-semibold">9:00 AM - 6:00 PM</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-300">Sábados</span>
                <span class="text-white font-semibold">9:00 AM - 2:00 PM</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-300">Domingos</span>
                <span class="text-red-300 font-semibold">Cerrado</span>
              </div>
            </div>
            
            <!-- Emergencias -->
            <div class="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <span class="text-red-300 font-semibold text-sm">Emergencias 24/7</span>
              </div>
              <a href="tel:+573014218455" class="text-white font-bold hover:text-red-200 transition">+57 301 421 8455</a>
            </div>
          </div>
          
          <!-- Información de Contacto -->
          <div>
            <h4 class="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Ubicación y Contacto
            </h4>
            
            <div class="space-y-4 mb-6">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <div>
                  <p class="text-slate-300 text-sm leading-relaxed">Carrera 6h número 26 f 43 b/nuevo pioneros</p>
                  <p class="text-slate-300 text-sm">Sincelejo, Magdalena, Colombia</p>
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+573014218455" class="text-white hover:text-green-300 transition font-semibold">+57 301 421 8455</a>
              </div>
              
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:centroodontologicoypsicologico@gmail.com" class="text-white hover:text-blue-300 transition text-sm">centroodontologicoypsicologico@gmail.com</a>
              </div>
            </div>
            
            <!-- Redes Sociales -->
            <div class="flex gap-3">
              <a href="#" class="group w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1" aria-label="Facebook">
                <i class="fab fa-facebook-f text-slate-200 group-hover:text-white"></i>
              </a>
              <a href="https://www.instagram.com/centroodontologicoypsicologico" target="_blank" class="group w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1" aria-label="Instagram">
                <i class="fab fa-instagram text-slate-200 group-hover:text-white"></i>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=573014218455" target="_blank" class="group w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1" aria-label="WhatsApp">
                <i class="fab fa-whatsapp text-slate-200 group-hover:text-white"></i>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Línea divisoria con gradiente -->
        <div class="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8"></div>
        
        <!-- Footer inferior -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-4">
            <p class="text-slate-400 text-sm">&copy; 2024 Centro Odontológico y Psicológico. Todos los derechos reservados.</p>
          </div>
          
          <div class="flex items-center gap-6 text-sm">
            <a routerLink="/nosotros" class="text-slate-400 hover:text-white transition">Nosotros</a>
            <a routerLink="/testimonios" class="text-slate-400 hover:text-white transition">Testimonios</a>
            <a routerLink="/contacto" class="text-slate-400 hover:text-white transition">Contacto</a>
          </div>
        </div>
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