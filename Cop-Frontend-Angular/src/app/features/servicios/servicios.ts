import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class ServiciosComponent {

  constructor(private router: Router) {}

  solicitarCita(servicio: string) {
    // Enviar al contacto con servicio preseleccionado (público)
    this.router.navigate(['/contacto'], { queryParams: { servicio } });
  }
}
