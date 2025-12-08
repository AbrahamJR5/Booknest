import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../models/book.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-libro-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './libro-card.html',
  styleUrl: './libro-card.scss'
})
export class LibroCard {
  @Input() libro!: Libro;


  imageError: boolean = false;

  get portadaUrl(): string {
    if (this.imageError) {
      return '/assets/images/book-placeholder.jpg';
    }

    if (this.libro.imagen) {
      return `http://localhost:3000/uploads/${this.libro.imagen}`;
    }

    return '/assets/images/book-placeholder.jpg';
  }

  onImageError() {
    this.imageError = true;
  }

}
