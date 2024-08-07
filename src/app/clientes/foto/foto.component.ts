import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'foto-cliente',
  templateUrl: './foto.component.html',
  styleUrl: './foto.component.css'
})
export class FotoComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  public fotoSeleccionada: File;
  progreso: number = 0;
 
  /*get FotoSeleccionada(): File {
    return this.fotoSeleccionada;
  }*/

  constructor(private clienteService: ClienteService,
    public modalService: ModalService){}
    //private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {/*
    this.activatedRoute.paramMap.subscribe(params =>{
      let id: number = +params.get('id');
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente =>{
          this.cliente = cliente;
        });
      }
    });*/
  }

  seleccionarFoto(event:any){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal.fire('Error seleccionar imagen', 'El archivo debe ser del tipo imagen', 'error' );
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){

    if(!this.fotoSeleccionada){
      swal.fire('Error Upload: ', 'debe seleccionar una foto', 'error' );
    }else{
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
    .subscribe(event => {

      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      } else if(event.type === HttpEventType.Response){
        let response:any = event.body;
        this.cliente = response.cliente as Cliente;

        this.modalService.notificarUpload.emit(this.cliente);
        swal.fire(' La foto se ha subido completamente', response.mensaje, 'success');
      }
      //this.cliente = cliente;
      
    });
  }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
  
}

