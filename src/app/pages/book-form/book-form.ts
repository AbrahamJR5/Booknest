import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro';
import { CategoriaService } from '../../services/categoria';
import { Libro } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss'
})
export class BookForm implements OnInit {
  private fb = inject(FormBuilder);
  private libroService = inject(LibroService);
  private categoriaService = inject(CategoriaService);

  bookForm!: FormGroup;
  libros: Libro[] = [];
  categorias: any[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  mensaje: string = '';

  ngOnInit() {
    this.bookForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      descripcion: ['', Validators.required],
      stock: [1, [Validators.required, Validators.min(1)]],
      id_categoria: ['', Validators.required]
    });

    this.cargarLibros();
    this.cargarCategorias();
  }

  cargarLibros() {
    this.libroService.getLibros().subscribe({
      next: (data) => this.libros = data,
      error: (err) => console.error(err)
    });
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
        next: (data) => this.categorias = data,
        error: () => console.warn('No se pudieron cargar categorías')
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.bookForm.invalid || !this.selectedFile) {
      alert('Por favor completa el formulario y selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    Object.keys(this.bookForm.value).forEach(key => {
      formData.append(key, this.bookForm.value[key]);
    });
    formData.append('imagen', this.selectedFile);

    this.libroService.createLibro(formData).subscribe({
      next: () => {
        alert('Libro registrado exitosamente');
        this.bookForm.reset({ stock: 1 });
        this.imagePreview = null;
        this.selectedFile = null;
        this.cargarLibros();
      },
      error: (err: any) => alert('Error al crear el libro')
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este libro del sistema?')) {
      this.libroService.eliminarLibro(id).subscribe({
        next: () => {
          this.cargarLibros();
          alert('Libro eliminado.');
        },
        error: (err: any) => alert('Error al eliminar.')
      });
    }
  }
}
