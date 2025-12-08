import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  // URL base simple
  private baseUrl = 'http://localhost:3000/uploads/';

  get portadaUrl(): string {
    // Depuración: Verás en la consola del navegador qué está intentando cargar
    console.log('Procesando imagen para:', this.libro.titulo, 'Nombre archivo:', this.libro.imagen);

    if (this.libro && this.libro.imagen) {
      // Retornamos la URL directa como texto simple
      return `${this.baseUrl}${this.libro.imagen}`;
    }
    // Fallback
    return 'assets/images/book-placeholder.jpg';
  }
}
