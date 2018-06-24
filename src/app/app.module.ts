import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PerfilAsistenciaComponent } from './perfil-asistencia/perfil-asistencia.component';
import {AsistenciaService} from './asistencia.service';
import { ObservadorFondoService} from './observador-fondo.service';
import {HttpClientModule} from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';

const config:SocketIoConfig={url:'http://127.0.0.1:1338' ,options:{}};

@NgModule({
  declarations: [
    AppComponent,
    PerfilAsistenciaComponent,
    ConfiguracionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
],
providers:[AsistenciaService,ObservadorFondoService],
bootstrap: [AppComponent]
})
export class AppModule { }
