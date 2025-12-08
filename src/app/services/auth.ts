import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/users/login';

  currentUser = signal<Usuario | null>(this.getUserFromStorage());

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response.usuario) {
          this.setUserToStorage(response.usuario);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('booknest_user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private setUserToStorage(user: Usuario) {
    localStorage.setItem('booknest_user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  private getUserFromStorage(): Usuario | null {
    const userStr = localStorage.getItem('booknest_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  get isAdmin(): boolean {
    return this.currentUser()?.tipo === 'admin';
  }
}
