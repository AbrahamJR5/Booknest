import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/reservations';

  crearReservacion(reservacion: { id_usuario: number, id_libro: number, fecha_limite: string }): Observable<any> {
    return this.http.post(this.apiUrl, reservacion);
  }
  getReservaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
