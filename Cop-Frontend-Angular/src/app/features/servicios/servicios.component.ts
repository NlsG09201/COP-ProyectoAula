import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  features: string[];
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <section class="services-section">
      <div class="services-header">
        <h2>Nuestros Servicios</h2>
        <p>Ofrecemos una amplia gama de servicios dentales con los más altos estándares de calidad</p>
      </div>

      <div class="services-grid">
        <div *ngFor="let service of services" class="service-card">
          <div class="service-image">
            <img [src]="service.image" [alt]="service.name">
          </div>
          <div class="service-content">
            <h3>{{service.name}}</h3>
            <p class="description">{{service.description}}</p>
            <div class="price-duration">
              <span class="price">{{service.price | currency:'COP':'symbol-narrow':'1.0-0'}}</span>
              <span class="duration">{{service.duration}}</span>
            </div>
            <ul class="features">
              <li *ngFor="let feature of service.features">
                <i class="fas fa-check"></i> {{feature}}
              </li>
            </ul>
            <button class="book-button" (click)="bookAppointment(service)">
              Agendar Cita
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      padding: 4rem 2rem;
      background: #f8f9fa;
    }

    .services-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .services-header h2 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .service-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .service-card:hover {
      transform: translateY(-5px);
    }

    .service-image {
      height: 200px;
      overflow: hidden;
    }

    .service-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .service-content {
      padding: 1.5rem;
    }

    .service-content h3 {
      font-size: 1.5rem;
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .description {
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .price-duration {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }

    .price {
      font-size: 1.8rem;
      color: #2c3e50;
      font-weight: bold;
    }

    .duration {
      color: #666;
    }

    .features {
      list-style: none;
      padding: 0;
      margin-bottom: 1.5rem;
    }

    .features li {
      margin-bottom: 0.5rem;
      color: #666;
    }

    .features i {
      color: #28a745;
      margin-right: 0.5rem;
    }

    .book-button {
      width: 100%;
      padding: 1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .book-button:hover {
      background: #0056b3;
    }

    @media (max-width: 768px) {
      .services-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ServiciosComponent implements OnInit {
  services: Service[] = [
    {
      id: 1,
      name: 'Limpieza Dental Profesional',
      description: 'Limpieza profunda y eliminación de sarro para una sonrisa saludable',
      price: 80000,
      duration: '45 minutos',
      image: 'assets/IMG/limpieza-dental.jpg',
      features: [
        'Eliminación de placa y sarro',
        'Pulido dental',
        'Revisión general',
        'Recomendaciones personalizadas'
      ]
    },
    {
      id: 2,
      name: 'Blanqueamiento Dental',
      description: 'Tratamiento profesional para aclarar el tono de tus dientes',
      price: 250000,
      duration: '90 minutos',
      image: 'assets/IMG/blanqueamiento.jpg',
      features: [
        'Evaluación previa',
        'Blanqueamiento LED',
        'Kit de cuidado posterior',
        'Garantía de resultados'
      ]
    },
    // Añade más servicios según sea necesario
  ];

  ngOnInit() {}

  bookAppointment(service: Service) {
    // Implementar lógica de reserva
  }
}