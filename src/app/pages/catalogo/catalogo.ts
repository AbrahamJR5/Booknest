import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LibroService } from '../../services/libro';
import { ReservacionService } from '../../services/reservacion';
import { AuthService } from '../../services/auth';
import { Libro } from '../../models/book.model';
import { LibroCard } from '../libro-card/libro-card';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, LibroCard],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo implements OnInit {
  private libroService = inject(LibroService);
  private reservacionService = inject(ReservacionService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  libros: Libro[] = [];
  librosOriginales: Libro[] = [];
  mensaje: string = '';

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.librosOriginales = data;
        this.libros = data;

        this.route.queryParams.subscribe(params => {
          const terminoBusqueda = params['q'];
          const categoriaSeleccionada = params['categoria'];
          let librosFiltrados = this.librosOriginales;


          if (terminoBusqueda) {
            const termino = terminoBusqueda.toLowerCase();
            librosFiltrados = librosFiltrados.filter(libro =>
              libro.titulo.toLowerCase().includes(termino)
            );
          }


          if (categoriaSeleccionada) {
            librosFiltrados = librosFiltrados.filter(libro =>
              libro.categoria === categoriaSeleccionada
            );
          }

          this.libros = librosFiltrados;
        });
      },
      error: (err) => console.error('Error al cargar libros:', err)
    });
  }

  manejarReservacion(libro: Libro) {
    const usuario = this.authService.currentUser();

    if (!usuario || !usuario.id_usuario) {
      alert('Debes iniciar sesión para reservar.');
      return;
    }

    if (!confirm(`¿Deseas reservar el libro "${libro.titulo}"?`)) return;

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 7);
    const fechaString = fechaLimite.toISOString().split('T')[0];

    const nuevaReservacion = {
      id_usuario: usuario.id_usuario,
      id_libro: libro.id_libro!,
      fecha_limite: fechaString
    };

    this.reservacionService.crearReservacion(nuevaReservacion).subscribe({
      next: () => {
        alert('Reservación exitosa. Tienes 7 días para recogerlo.');
        this.cargarLibros();
      },
      error: (err) => {
        console.error(err);
        alert('Error al reservar: ' + (err.error.mensaje || err.message));
      }
    });
  }
}
