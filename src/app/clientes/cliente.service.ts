import { Injectable } from '@angular/core';
import {  DatePipe,  } from '@angular/common';

//import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { map, of, Observable, catchError, throwError, tap } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpProgressEvent } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint:string= 'http://localhost:8072/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint + '/page/' + page).pipe(
      tap( (response:  any) => {
        
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        }

        )
      }),
      map( (response: any) => {
        
         (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          
          let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy'); //formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
        return response; 
      }
    ),
    tap(response => {
      console.log('ClienteService: tap 2');
      (response.content as Cliente[]).forEach( cliente => {
        console.log(cliente.nombre);
      }

      )
    })
    );
  }

  create(cliente: Cliente) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(() =>e);
        }
        console.error(e.error.mensaje);
        swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
        return throwError(() =>e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() =>e);

      })
    );

  }

  update(cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(() =>e);
        }
        console.error(e.error.mensaje);
        swal.fire('Error al editar el cliente', e.error.mensaje, 'error');
        return throwError(() =>e);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
        return throwError(() =>e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }
}
