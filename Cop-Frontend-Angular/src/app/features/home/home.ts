import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit, AfterViewInit {

  ngOnInit() {
    console.log('Página de Inicio cargada y lista.');
  }

  ngAfterViewInit() {
    // Animate sections after view is initialized
    this.animateSections();
  }

  private animateSections() {
    const sections = document.querySelectorAll('.hero-section, .about-us-preview, .services-preview');
    sections.forEach((section, i) => {
      const element = section as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(40px)';
      
      setTimeout(() => {
        element.style.transition = 'opacity 0.7s, transform 0.7s';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 200 + i * 200);
    });
  }
}
