import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ProductoComponent } from './producto/producto.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes=[
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'productos', component: ProductoComponent},
  {path: 'clientes', component: ClientesComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductoComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
      provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
