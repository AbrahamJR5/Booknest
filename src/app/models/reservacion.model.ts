// src/app/models/reservacion.model.ts
export interface Reservacion {
  id_reservacion?: number;
  id_usuario: number;
  id_libro: number;
  fecha_reservacion?: Date;
  fecha_limite: string;
  estado?: 'pendiente' | 'recogido' | 'cancelado';

  nombre_usuario?: string;
  titulo_libro?: string;
}
