import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro';
import { AuthService } from '../../services/auth';
import { ReservacionService } from '../../services/reservacion';
import { Libro } from '../../models/book.model';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservar.html',
  styleUrl: './reservar.scss'
})
export class Reservar implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private libroService = inject(LibroService);
  public authService = inject(AuthService);
  private reservacionService = inject(ReservacionService);

  libro: Libro | null = null;
  reservarForm!: FormGroup;
  mensaje: string = '';
  auth: any;

  ngOnInit() {
    if (!this.auth.currentUser()) {
      this.router.navigate(['/login']);
      return;
    }

    const idLibro = this.route.snapshot.paramMap.get('id');
    if (idLibro) {
      this.cargarLibro(+idLibro);
    }

    this.reservarForm = this.fb.group({
      fecha_limite: ['', Validators.required],
      notas: ['']
    });
  }

  cargarLibro(id: number) {
    this.libroService.getLibroById(id).subscribe({
      next: (data) => this.libro = data,
      error: () => this.mensaje = 'Error al cargar el libro.'
    });
  }

  onSubmit() {
    if (this.reservarForm.invalid || !this.libro) return;

    const usuario = this.authService.currentUser();
    const datosReserva = {
      id_usuario: usuario?.id_usuario!,
      id_libro: this.libro.id_libro!,
      fecha_limite: this.reservarForm.value.fecha_limite
    };

    this.reservacionService.crearReservacion(datosReserva).subscribe({
      next: () => {
        alert('¡Libro reservado con éxito!');
        this.router.navigate(['/mis-reservaciones']);
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error: ' + (err.error.mensaje || 'No se pudo reservar');
      }
    });
  }
}
