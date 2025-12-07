export interface Libro {
  id_libro?: number;
  titulo: string;
  autor: string;
  descripcion: string;
  imagen: string;
  stock: number;
  categoria?: string;
  id_categoria?: number;
}
