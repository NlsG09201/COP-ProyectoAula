import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private scrollToTopButton: HTMLElement | null = null;

  constructor(private router: Router) {
    this.setupScrollToTop();
    this.setupRouteChangeHandler();
  }

  // Mobile menu toggle functionality
  toggleMobileMenu(): void {
    const navMenu = document.getElementById('main-menu');
    if (navMenu) {
      navMenu.classList.toggle('hidden');
    }
  }

  // Close mobile menu
  closeMobileMenu(): void {
    const navMenu = document.getElementById('main-menu');
    if (navMenu && window.innerWidth < 1024) {
      navMenu.classList.add('hidden');
    }
  }

  // Setup scroll to top button
  private setupScrollToTop(): void {
    // Create scroll to top button if it doesn't exist
    if (!this.scrollToTopButton) {
      this.scrollToTopButton = document.createElement('button');
      this.scrollToTopButton.id = 'scroll-to-top';
      this.scrollToTopButton.innerHTML = '↑';
      this.scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        display: none;
        background: #0891b2;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
      `;
      
      this.scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      
      document.body.appendChild(this.scrollToTopButton);
    }

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (this.scrollToTopButton) {
        if (window.scrollY > 300) {
          this.scrollToTopButton.style.display = 'block';
        } else {
          this.scrollToTopButton.style.display = 'none';
        }
      }
    });
  }

  // Handle route changes for active link highlighting
  private setupRouteChangeHandler(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.highlightActiveLink(event.url);
        this.closeMobileMenu();
        this.scrollToTop();
      });
  }

  // Highlight active navigation link
  private highlightActiveLink(currentUrl: string): void {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const linkElement = link as HTMLElement;
      linkElement.classList.remove('active');
      
      const href = linkElement.getAttribute('routerLink') || linkElement.getAttribute('href');
      if (href === currentUrl || (currentUrl === '/' && href === '/home')) {
        linkElement.classList.add('active');
      }
    });
  }

  // Smooth scroll to top
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Animate elements on scroll
  animateOnScroll(): void {
    const animated = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animated.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        (el as HTMLElement).style.animationPlayState = 'running';
      }
    });
  }

  // Setup scroll animations
  setupScrollAnimations(): void {
    window.addEventListener('scroll', () => this.animateOnScroll());
    // Initial check
    setTimeout(() => this.animateOnScroll(), 100);
  }

  // Setup focus outline for accessibility
  setupFocusOutline(): void {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    });
    
    document.body.addEventListener('mousedown', () => {
      document.body.classList.remove('user-is-tabbing');
    });
  }

  // Close menu when clicking outside
  setupClickOutsideHandler(): void {
    document.addEventListener('click', (e) => {
      const menuToggle = document.getElementById('menu-toggle');
      const navMenu = document.getElementById('main-menu');
      
      if (menuToggle && navMenu && 
          !menuToggle.contains(e.target as Node) && 
          !navMenu.contains(e.target as Node) && 
          window.innerWidth < 1024 && 
          !navMenu.classList.contains('hidden')) {
        navMenu.classList.add('hidden');
      }
    });
  }
}