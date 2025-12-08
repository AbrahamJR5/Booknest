import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Usuario } from '../../models/user.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage: string = '';
  successMessage: string = '';

  registroForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    claveAdmin: ['']
  });

  onSubmit() {
    if (this.registroForm.invalid) return;

    const nuevoUsuario: Usuario = {
      nombre: this.registroForm.value.nombre!,
      email: this.registroForm.value.email!,
      password: this.registroForm.value.password!,
      claveAdmin: this.registroForm.value.claveAdmin || ''
    };

    this.authService.register(nuevoUsuario).subscribe({
      next: () => {
        this.successMessage = '¡Cuenta creada con éxito! Redirigiendo al login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al registrarse. El correo podría ya estar en uso.';
      }
    });
  }
}
