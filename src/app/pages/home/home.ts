import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../services/libro';
import { CategoriaService } from '../../services/categoria';
import { Libro } from '../../models/book.model';
import { Categoria } from '../../models/category.model';
import { LibroCard } from '../libro-card/libro-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LibroCard, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  private libroService = inject(LibroService);
  private categoriaService = inject(CategoriaService);
  private router = inject(Router);


  librosDestacados: Libro[] = [];
  categorias: Categoria[] = [];
  terminoBusqueda: string = '';

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.librosDestacados = data.slice(0, 4);
      },
      error: (err) => console.error('Error cargando libros:', err)
    });

    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data.slice(0, 4);
      },
      error: (err) => console.error('Error cargando categorías:', err)
    });
  }

  buscarLibros() {
    if (this.terminoBusqueda.trim()) {
      this.router.navigate(['/catalogo'], {
        queryParams: { q: this.terminoBusqueda }
      });
    }
  }

}
