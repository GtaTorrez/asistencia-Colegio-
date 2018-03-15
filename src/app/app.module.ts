import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PerfilAsistenciaComponent } from './perfil-asistencia/perfil-asistencia.component';
import {AsistenciaService} from './asistencia.service';
import {HttpClientModule} from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config:SocketIoConfig={url:'http://192.168.0.100:1338' ,options:{}};

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
    SocketIoModule.forRoot(config)
],
providers:[AsistenciaService],
bootstrap: [AppComponent]
})
export class AppModule { }
