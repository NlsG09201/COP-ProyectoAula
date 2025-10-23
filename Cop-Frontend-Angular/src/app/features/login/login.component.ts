import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <section class="container mx-auto max-w-md p-6">
      <h2 class="text-2xl font-bold mb-4">Acceso al Dashboard</h2>
      <form (ngSubmit)="login()">
        <div class="mb-4">
          <label class="block mb-1" for="user">Usuario</label>
          <input id="user" type="text" [(ngModel)]="username" name="username" class="w-full border rounded px-3 py-2" required autocomplete="username">
        </div>
        <div class="mb-4">
          <label class="block mb-1" for="pass">Contraseña</label>
          <input id="pass" type="password" [(ngModel)]="password" name="password" class="w-full border rounded px-3 py-2" required autocomplete="current-password">
        </div>
        <button class="btn-primary" type="submit">Ingresar</button>
      </form>
      <p class="text-gray-600 mt-3">Usa admin / admin123 para desarrollo.</p>
    </section>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) {}
  login(){
    const ok = this.auth.login(this.username, this.password);
    if(ok){ this.router.navigate(['/dashboard']); }
  }
}