import { Component, OnInit,OnDestroy } from '@angular/core';
import { AsistenciaService }  from '../asistencia.service';
import { QRCodeComponent } from 'angular2-qrcode';
import { Perfil } from './perfil'; 
import { ObservadorFondoService } from '../observador-fondo.service';


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
  fnc:any;
  titulo:boolean=true;
  contadorProtector:number=30;
  intervalclock;


  constructor(
    private serve:AsistenciaService,
    private observadorFondoService:ObservadorFondoService
  ) { 
    console.log("Sucribiendose al sockets")
    this.getPerfil();
    this.iniciarContadorrotector(this.contadorProtector,this.observadorFondoService);
  }

  getPerfil(){
    // console.log("Sucribiendose al sockets")
    this.serve.getPersonas().subscribe(data=>{
      // console.log("conectado al sockets")
      this.resetearContador();
      this.observadorFondoService.cambiarEstadoProtector(false);


      this.perfil.identificacion=data.identificacion;
      this.perfil.paterno=data.paterno;
      this.perfil.materno=data.materno;
      this.perfil.nombre=data.nombre;
      this.perfil.curso=data.curso;
      this.perfil.turno=data.turno;
      this.perfil.img=data.img;
      this.perfil.hora_salida=data.hora_salida;
      this.perfil.hora_llegada=data.hora_llegada;
      this.perfil.rol=data.rol;
      

      if(data.rol==="tutor"){
        this.perfil.alumnos=data.alumnos;
      }else{
        if(data.rol==="alumno"){
          this.perfil.tutores=data.tutores;
        }
        }
      // console.log(data);
    },err=>{
      console.error(err)
    })
  }

  ngOnInit() {
  
  }
  ngOnDestroy(){
    
  }

  resetearContador(){
    this.contadorProtector=30;
    if(this.intervalclock !== null){
      clearInterval(this.intervalclock);
      this.iniciarContadorrotector(this.contadorProtector,this.observadorFondoService);
    }
  }

  iniciarContadorrotector(contador,observador){
    console.log("contador iniciado")
    this.intervalclock=setInterval(function(){
      console.log(contador)
      if(contador>0){
        contador--;
      }else{
        if( contador=== 0 ){
          observador.cambiarEstadoProtector(true);
        }
      }
    },1000)
  }

}
