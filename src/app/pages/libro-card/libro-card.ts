import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// IMPORTACIONES CRÍTICAS: Necesitas DomSanitizer para permitir URLs de otros puertos
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Libro } from '../../models/book.model';

@Component({
  selector: 'app-libro-card',
  standalone: true,
  // Necesitas CommonModule para usar *ngIf o @if
  imports: [CommonModule],
  templateUrl: './libro-card.html',
  styleUrl: './libro-card.scss'
})
export class LibroCard {
  @Input() libro!: Libro;

  // 1. Inyección del servicio de sanitización
  private sanitizer = inject(DomSanitizer);

  // URL base donde tu backend sirve las imágenes
  private baseUrl = 'http://localhost:3000/uploads/';

  // 2. Getter que construye la URL y la marca como segura
  get portadaUrl(): SafeResourceUrl | string {
    if (this.libro.imagen) {
      const fullUrl = `${this.baseUrl}${this.libro.imagen}`;
      // CRÍTICO: Usamos bypassSecurityTrustResourceUrl para evitar el bloqueo de Angular
      return this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
    }
    // Fallback si no hay nombre de imagen en la BD
    return '/assets/images/book-placeholder.jpg';
  }
}
