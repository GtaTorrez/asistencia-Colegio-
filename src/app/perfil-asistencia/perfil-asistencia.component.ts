import { Component, OnInit,OnDestroy } from '@angular/core';
import { AsistenciaService }  from '../asistencia.service';
import { QRCodeComponent } from 'angular2-qrcode';
import { Perfil } from './perfil'; 


@Component({
  selector: 'app-perfil-asistencia',
  templateUrl: './perfil-asistencia.component.html',
  styleUrls: ['./perfil-asistencia.component.css']
})
export class PerfilAsistenciaComponent implements OnInit,OnDestroy {

  tipoInstitucion="UNIDAD ACADEMICA";
  nombrePrimario="AMERICANO";
  nombreSecundario="INSTITUTO";
  perfil:Perfil=new Perfil();
  img="assets/img/fondof.jpg";
  imgPatter="https://image.freepik.com/free-vector/abstract-background-with-a-3d-pattern_1319-68.jpg";
  imgBackground="" 
  qr:string;
  fnc:any;
  constructor(
    private serve:AsistenciaService
  ) { 
    this.imgBackground= this.imgBackground?this.imgBackground:this.img;
  }

  getPerfil(){
    
    this.serve.getPersonas().subscribe(data=>{
      console.log(data);
      this.perfil.identificacion=data.identificacion;
        this.perfil.paterno=data.paterno;
        this.perfil.materno=data.materno;
        this.perfil.nombre=data.nombre;
        this.perfil.curso=data.curso;
        this.perfil.turno=data.turno;
        this.perfil.img="http://127.0.0.1:1337/"+data.img;
        this.perfil.qr=data.identificacion;
        this.qr=data.identificacion;
        this.perfil.hora_salida=data.hora_salida;
        this.perfil.hora_llegada=data.hora_llegada;
    },err=>{
      console.error(err)
    })
  }

  ngOnInit() {
  this.getPerfil();
  }
  ngOnDestroy(){
    
  }
  

}
