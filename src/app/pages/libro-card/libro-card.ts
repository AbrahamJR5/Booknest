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

  // Variable para controlar si la imagen falló
  imageError: boolean = false;

  get portadaUrl(): string {
    // 1. Si ya falló la carga, devuelve el placeholder
    if (this.imageError) {
      return '/assets/images/book-placeholder.jpg';
    }

    // 2. Si hay imagen en el libro, devuelve la URL directa (SIN SANITIZER por ahora)
    if (this.libro.imagen) {
      return `http://localhost:3000/uploads/${this.libro.imagen}`;
    }

    // 3. Si no hay imagen, placeholder
    return '/assets/images/book-placeholder.jpg';
  }

  // Función para manejar el error de carga (cuando no encuentra la imagen)
  onImageError() {
    this.imageError = true;
  }
}
