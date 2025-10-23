import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './testimonios.html',
  styleUrl: './testimonios.css',
})
export class TestimoniosComponent {
  testimonialForm = {
    nombre: '',
    mensaje: '',
    calificacion: 5,
    imagen: null as File | null
  };

  selectedRating = 5;

  setRating(rating: number) {
    this.selectedRating = rating;
    this.testimonialForm.calificacion = rating;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.testimonialForm.imagen = file;
    }
  }

  onSubmit() {
    console.log('Testimonio enviado:', this.testimonialForm);
    // Aquí se implementaría la lógica para enviar el testimonio al backend
  }
}
