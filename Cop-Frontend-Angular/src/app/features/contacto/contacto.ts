import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class ContactoComponent {
  contactForm = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  };

  onSubmit() {
    console.log('Formulario de contacto enviado:', this.contactForm);
    // Aquí se implementaría la lógica para enviar el formulario al backend
    
    // Resetear el formulario después del envío
    this.contactForm = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    };
  }
}
