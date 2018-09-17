import { Component, OnInit } from '@angular/core';
import { AvanzadoService } from '../avanzado.service';

@Component({
  selector: 'app-config-avanzado',
  templateUrl: './config-avanzado.component.html',
  styleUrls: ['./config-avanzado.component.css']
})
export class ConfigAvanzadoComponent implements OnInit {

  ports:Ports[];
  portsRegistred:string[];
  pathServer:string;

  constructor(private avanzado:AvanzadoService) { }

  ngOnInit() {
    // this.avanzado.postAction('activados');
    this.getPorts();
    this.getPortsConnected();
    this.getServerUrl()
  }
  getPorts(){
    this.avanzado.getPuertos().subscribe((port:any)=>{
      console.log(port);
      this.ports=port;
      this.avanzado.getPuertosSeleccionados().subscribe((data:any[])=>{
        console.log(data);
        this.ports.forEach(element=>{
            data.forEach(name => {
              if(name===element.comName){
                element.isActived=true;
              }
            });
            if(element.isActived!=true){
              element.isActived=false;
            }
        });
        console.log("ports Activaded",this.ports)
      })
    })
  }
//link url
getServerUrl(){
  this.avanzado.getUrlServe().subscribe((data:any)=>{
    console.log(data);
    this.pathServer=data.pathserver;
  })
}

postServerUrl(){
  this.avanzado.postUrlServe(this.pathServer).subscribe((data:any)=>{
    alert(data.msg);
  },err=>{
    alert("Error al cmabiar la ruta");
  })
}
  
//puertos
  getPortsConnected(){
    this.avanzado.getPuertosSeleccionados().subscribe((data:any)=>{
      console.log(data);
      this.portsRegistred=data;
    })
  }
  deletePuerto(puerto){
    this.avanzado.deletePuertoSeleccionado(puerto).subscribe(data=>{
      console.log(data);
      alert('Se elimino el puerto');
      this.getPortsConnected();
    },err=>{
      alert('No se pudo eliminar')
    })
  }

  postPuerto(port){
    console.log("post port");
    let body={comName:port.comName}
    this.avanzado.postPort(body).subscribe((data:any)=>{
      console.log(data);
      alert(data.msg)
      port.isActived=true;
    },err=>{
      alert("No se pudo guardar")
    })
  }

}

export interface Ports{
  comName:string;
  manufacturer:string;
  serialNumber:string;
  vendorId:string;
  productId:string;
  isActived:boolean;
}