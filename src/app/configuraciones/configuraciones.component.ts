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
    console.log("CAMBIO DE IMAGEN");
    this.fileArchivo=this.fileInput.nativeElement.files.item(0);
    console.log(this.fileArchivo); 
  }
  getFoto(){
    this.observador.getFoto().subscribe((data:any)=>{
      console.log(data);
      this.img=data.fondo;
    })
  }

  onSubmit() {
    const formModel = this.prepareSave();
    // In a real-world app you'd have a http request / service call here like
    // this.observador.postFoto('apiUrl', formModel)
    this.observador.postFoto(formModel).subscribe((data:any)=>{
      console.log("echo")
      // console.log(data)
      if (data.fondo) {
        let foto:any;
        this.observador.getFoto().subscribe((fotos:any)=>{
          foto=fotos;
          localStorage.setItem("fondo",fotos.fondo);
          console.log(localStorage.getItem("fondo"));;
        this.observador.cambiarEstado(fotos.fondo);
         // window.location.reload(true);
        });
      }
    },err=>{
      alert('Error al intentar subir la foto')
      console.error(err)
    })

  }

  getPuertos(){
    this.observador.getPuertos().subscribe((data:any)=>{
      console.log(data);
    })
  }

  restaurar(){
    localStorage.clear();
    this.observador.cambiarEstado("assets/img/fondof.jpg");
  }


}
