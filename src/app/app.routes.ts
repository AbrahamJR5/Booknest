import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalogo } from './pages/catalogo/catalogo';
import { Reservar } from './pages/reservar/reservar';
import { Reservaciones } from './pages/reservaciones/reservaciones';
import { BookForm } from './pages/book-form/book-form';
import { Login } from './pages/login/login';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'catalogo', component: Catalogo },
  { path: 'reservar', component: Reservar },
  { path: 'mis-reservaciones', component: Reservaciones },
  { path: 'admin/nuevo-libro', component: BookForm },
  { path: '**', redirectTo: '' }
];
