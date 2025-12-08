import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/books';

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }


  getLibroById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  createLibro(formData: FormData): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, formData);
  }

  eliminarLibro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
