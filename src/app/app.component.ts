import { Component ,OnInit } from '@angular/core';
import {ObservadorFondoService} from "./observador-fondo.service"

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  img="assets/img/fondof.jpg";
  imgPatter="https://image.freepik.com/free-vector/abstract-background-with-a-3d-pattern_1319-68.jpg";
  imgBackground="assets/img/fondof.jpg";
  subscription:Subscription;
  constructor(private observador:ObservadorFondoService){
    console.log(this.imgBackground);
  	this.subscription=this.observador.observableFondo.subscribe(fondo=>{
      this.imgBackground=fondo+'?nocache='+parseInt(Math.random()*100+"");
  	});
  	
  }

  ngOnInit(){

    this.imgBackground="assets/img/fondof.jpg";
    console.log(this.imgBackground);
    if(("fondo" in localStorage)){
      console.log("true");
      console.log(this.imgBackground);
      this.imgBackground=localStorage.getItem("fondo");
      console.log(this.imgBackground);
    }else{
      console.log("false");
      console.log(this.imgBackground);
      this.imgBackground="assets/img/fondof.jpg";
      console.log(this.imgBackground);
    }
    console.log("cierre el if");
    console.log(this.imgBackground);
  }

}
