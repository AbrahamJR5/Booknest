export interface Usuario {
  id_usuario?: number;
  nombre: string;
  email: string;
  password?: string;
  fecha_registro?: Date;
  tipo?: 'admin' | 'usuario';
  claveAdmin?: string;
}
