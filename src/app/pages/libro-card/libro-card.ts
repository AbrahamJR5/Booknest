import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from  '../../models/book.model';

@Component({
  selector: 'app-libro-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libro-card.html',
  styleUrl: './libro-card.scss'
})

export class LibroCard {
  @Input() libro!: Libro;


  private baseUrl = 'http://localhost:3000/uploads/';
  get portadaUrl(): string {
    if (this.libro.imagen) {
      return `http://localhost:3000/uploads/${this.libro.imagen}`;
    }
    return 'assets/images/book-placeholder.jpg';
  }
}
