import { Component } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  listaProducto: string[]= ['llantas y neumaticos', 'luz', 'inflador', 'portacaramañola', 'protector', 'herramientas', 'portabicicletas'];

  habilitar: boolean= true;

  constructor(){}
  setHabilitar(): void{
    this.habilitar = (this.habilitar==true)? false: true
  }
}
