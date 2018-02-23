import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PerfilAsistenciaComponent } from './perfil-asistencia/perfil-asistencia.component';
import {AsistenciaService} from './asistencia.service';
import {HttpClientModule} from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    PerfilAsistenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QRCodeModule,
],
providers:[AsistenciaService],
bootstrap: [AppComponent]
})
export class AppModule { }
