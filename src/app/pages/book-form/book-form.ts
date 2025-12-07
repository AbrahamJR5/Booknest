import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../services/libro';
import { CategoriaService } from '../../services/categoria';
import { Categoria } from '../../models/category.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm implements OnInit {
  private fb = inject(FormBuilder);
  private libroService = inject(LibroService);
  private categoriaService = inject(CategoriaService);

  bookForm!: FormGroup;
  categorias: Categoria[] = [];
  archivoSeleccionado: File | null = null;
  mensajeEnvio: string = '';

  ngOnInit(): void {
    this.cargarCategorias();
    this.bookForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      descripcion: [''],
      stock: [1, [Validators.required, Validators.min(1)]],
      id_categoria: ['', Validators.required],
    });
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
    } else {
      this.archivoSeleccionado = null;
    }
  }

  onSubmit(): void {
    this.mensajeEnvio = '';

    if (this.bookForm.invalid || !this.archivoSeleccionado) {
      this.bookForm.markAllAsTouched();
      this.mensajeEnvio = 'Por favor, completa todos los campos requeridos y sube una imagen.';
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.bookForm.get('titulo')!.value);
    formData.append('autor', this.bookForm.get('autor')!.value);
    formData.append('descripcion', this.bookForm.get('descripcion')!.value);
    formData.append('stock', this.bookForm.get('stock')!.value.toString());
    formData.append('id_categoria', this.bookForm.get('id_categoria')!.value);
    formData.append('imagen', this.archivoSeleccionado, this.archivoSeleccionado.name);

    this.libroService.createLibro(formData).subscribe({
      next: (response) => {
        this.mensajeEnvio = 'Libro creado con éxito. ID: ' + response.id_libro;
        this.bookForm.reset({ stock: 1 }); // Limpiar formulario
        this.archivoSeleccionado = null;
      },
      error: (err) => {
        console.error('Error al crear libro:', err);
        this.mensajeEnvio = 'Error al intentar crear el libro. Revisa la consola y el backend.';
      }
    });
  }
}
