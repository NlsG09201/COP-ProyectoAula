import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatListModule, RouterModule],
  template: `
    <mat-toolbar color="primary">Clinica Odontológica — Dashboard</mat-toolbar>
    <div class="app-shell">
      <aside class="sidebar">
        <nav>
          <mat-nav-list>
            <a mat-list-item routerLink="/">Inicio</a>
            <a mat-list-item routerLink="/citas">Citas</a>
            <a mat-list-item routerLink="/odontograma">Odontograma</a>
          </mat-nav-list>
        </nav>
      </aside>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}