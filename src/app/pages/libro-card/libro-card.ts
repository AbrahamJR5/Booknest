import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. IMPORTAR SafeUrl en lugar de SafeResourceUrl
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Libro } from '../../models/book.model';

@Component({
  selector: 'app-libro-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libro-card.html',
  styleUrl: './libro-card.scss'
})
export class LibroCard {
  @Input() libro!: Libro;

  private sanitizer = inject(DomSanitizer);
  private baseUrl = 'http://localhost:3000/uploads/';

  // 2. CAMBIAR el tipo de retorno y el método de seguridad
  get portadaUrl(): SafeUrl | string {
    if (this.libro.imagen) {
      const fullUrl = `${this.baseUrl}${this.libro.imagen}`;
      // CORRECCIÓN: Usar bypassSecurityTrustUrl para imágenes
      return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
    }
    return '/assets/images/book-placeholder.jpg';
  }
}
