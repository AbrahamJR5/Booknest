import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Importamos DatePipe para las fechas
import { ReservacionService } from '../../services/reservacion';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './reservaciones.html',
  styleUrl: './reservaciones.scss'
})
export class Reservaciones implements OnInit {
  private reservacionService = inject(ReservacionService);
  public authService = inject(AuthService);

  misReservas: any[] = [];
  cargando: boolean = true;

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    this.cargando = true;
    const usuarioLogueado = this.authService.currentUser();

    if (usuarioLogueado) {
      this.reservacionService.getReservaciones().subscribe({
        next: (data) => {
          this.misReservas = data.filter(r => r.id_usuario === usuarioLogueado.id_usuario);
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error cargando reservas', err);
          this.cargando = false;
        }
      });
    }
  }

  cancelar(id_reservacion: number) {
    if (confirm('¿Estás seguro de cancelar esta reserva? El libro volverá a estar disponible.')) {
      this.reservacionService.cancelarReservacion(id_reservacion).subscribe({
        next: () => {
          alert('Reserva cancelada correctamente');
          this.cargarReservas();
        },
        error: (err) => alert('Error al cancelar la reserva')
      });
    }
  }
}
