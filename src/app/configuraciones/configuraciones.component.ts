import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ObservadorFondoService } from "../observador-fondo.service"

import { ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {


	form: FormGroup;
	@ViewChild('fileInput') fileInput: ElementRef;
  img;
  fileArchivo:any;
  constructor(
  	private observador:ObservadorFondoService,
  	private fb: FormBuilder
  	) {
  	this.createForm();

  }

  ngOnInit() {
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      fondo: null
    });
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('fondo', this.fileInput.nativeElement.files.item(0));
    return input;
  }
  onFileChange(event) {
    this.fileArchivo=this.fileInput.nativeElement.files.item(0);
  }
  getFoto(){
    this.observador.getFoto().subscribe((data:any)=>{
      this.img=data.fondo;
    })
  }

  onSubmit() {
    const formModel = this.prepareSave();
    if(this.fileInput.nativeElement.files.item(0)){
    this.observador.postFoto(formModel).subscribe((data:any)=>{
      if (data.fondo) {
        let foto:any;
        console.log(data);
        this.observador.getFoto().subscribe((fotos:any)=>{
          localStorage.setItem("fondo",fotos.fondo);
          this.observador.cambiarEstado(fotos.fondo);
        //window.location.reload(true);
        alert("Espere mientras se hace el cambio");
        },err=>{
          console.log(err)
        });
      }
    },err=>{
      alert('Error al intentar subir la foto')
      console.log(err);
    });
  }else{
    alert("Debe escoge una imagen")
  }

  }

  getPuertos(){
    this.observador.getPuertos().subscribe((data:any)=>{
    })
  }

  restaurar(){
    localStorage.clear();
    this.observador.cambiarEstado("assets/img/fondof.jpg");
  }


}
