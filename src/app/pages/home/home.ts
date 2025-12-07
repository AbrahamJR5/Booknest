import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- CRÍTICO: Agregamos RouterModule para las directivas routerLink
import { LibroService } from '../../services/libro';
import { CategoriaService } from '../../services/categoria';
import { Libro } from '../../models/book.model';
import { Categoria } from '../../models/category.model'; // <-- Usamos el nombre del modelo acordado
import { LibroCard } from '../libro-card/libro-card';

@Component({
  selector: 'app-home',
  standalone: true,
  // CRÍTICO: Agregamos RouterModule aquí
  imports: [CommonModule, RouterModule, LibroCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  private libroService = inject(LibroService);
  private categoriaService = inject(CategoriaService);

  librosDestacados: Libro[] = [];
  categorias: Categoria[] = [];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Carga de Libros Destacados
    this.libroService.getLibros().subscribe({
      next: (data) => {
        // Tomamos los primeros 4 libros
        this.librosDestacados = data.slice(0, 4);
      },
      error: (err) => console.error('Error cargando libros:', err)
    });

    // Carga de Categorías
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        // Tomamos las primeras 4 categorías para la vista de Home
        this.categorias = data.slice(0, 4);
      },
      error: (err) => console.error('Error cargando categorías:', err)
    });
  }
}
