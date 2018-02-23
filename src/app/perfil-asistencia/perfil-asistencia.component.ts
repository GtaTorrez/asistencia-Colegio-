import { Component, OnInit,OnDestroy } from '@angular/core';
import { AsistenciaService }  from '../asistencia.service';
import { QRCodeComponent } from 'angular2-qrcode';
import { Perfil } from './perfil'; 
import { clearInterval } from 'timers';

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
  img="./assets/img/fondof.jpg"
  imgPatter="https://image.freepik.com/free-vector/abstract-background-with-a-3d-pattern_1319-68.jpg"
  imgBackground="" 
  qr:string;
  fnc:any;
  constructor(
    private serve:AsistenciaService
  ) { 
    
  }

  getPerfil(){
    this.serve.getPersona().subscribe(data=>{
      console.log(data);
      this.perfil.nroMatricula=data.id;
        this.perfil.paterno=data.paterno;
        this.perfil.materno=data.materno;
        this.perfil.nombre=data.nombre;
        this.perfil.curso="Sexto A";
        this.perfil.turno="tarde";
        this.perfil.img="";
        this.perfil.qr=data.nombre+data.cedula;
        this.qr=data.ci+" "+ data.nombre+" "+data.id;
    },err=>{
      console.error(err)
    })
  }

  ngOnInit() {
    
    this.fnc=setInterval(()=>{
      this.getPerfil();
      console.log("pedido get ")
    },1000)
    this.imgBackground=this.img?this.img:this.imgPatter;
  }
  ngOnDestroy(){
    clearInterval(this.fnc);
  }
  

}
