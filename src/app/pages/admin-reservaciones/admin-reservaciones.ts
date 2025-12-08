import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReservacionService } from '../../services/reservacion';

@Component({
  selector: 'app-admin-reservaciones',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './admin-reservaciones.html',
  styleUrl: './admin-reservaciones.scss'
})
export class AdminReservaciones implements OnInit {
  private reservacionService = inject(ReservacionService);

  reservas: any[] = [];
  cargando: boolean = true;

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    this.cargando = true;
    this.reservacionService.getReservaciones().subscribe({
      next: (data) => {
        this.reservas = data; 
        this.cargando = false;
      },
      error: (err) => console.error(err)
    });
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    this.reservacionService.actualizarEstado(id, nuevoEstado).subscribe({
      next: () => {
        alert(`Estado actualizado a: ${nuevoEstado}`);
        this.cargarReservas();
      },
      error: (err) => alert('Error al actualizar estado')
    });
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar esta reserva permanentemente? El stock se devolverá.')) {
      this.reservacionService.cancelarReservacion(id).subscribe({
        next: () => {
          alert('Reserva eliminada.');
          this.cargarReservas();
        },
        error: (err) => alert('Error al eliminar')
      });
    }
  }
}
