import { Component, OnInit, inject } from '@angular/core';
import { CategoriaService } from '../../../services/categoria';
import { Categoria } from '../../models/category.model';


export class Home implements OnInit {
//  private libroService = inject(LibroService);
  private categoriaService = inject(CategoriaService);

  //librosDestacados: Libro[] = [];
  categorias: Categoria[] = [];

  ngOnInit() {



    this.categoriaService.getCategorias().subscribe(data => {

      this.categorias = data.slice(0, 4);
    });
  }
}
