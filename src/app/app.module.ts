import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductoComponent } from './producto/producto.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';


import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import {  registerLocaleData } from '@angular/common';
import localesES from '@angular/common/locales/es';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(localesES, 'es');

const routes: Routes=[
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'productos', component: ProductoComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductoComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es' }, MatDatepickerModule, provideAnimationsAsync()
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
