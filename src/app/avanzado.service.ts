import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ng-socket-io';


@Injectable()
export class AvanzadoService {
  base:string="http://127.0.0.1:1338";
  event:string='handlePorts';
  constructor(
    private http:HttpClient,
    private socket:Socket
  ) { }

  getUrlServe(){
    return this.http.get(this.base+'/server')
  }
  postUrlServe(serverPath){
    let body={pathserver:serverPath};
    return this.http.post(this.base+'/server',body);
  }

  getPuertos(){
  	return this.http.get(this.base+'/puertos');
  }
  getPuertosSeleccionados(){
  	return this.http.get(this.base+'/seleccionados');
  }
  deletePuertoSeleccionado(puerto:string){
    return this.http.delete(this.base+'/seleccionados/'+puerto);
  }
  postPort(body){
    return this.http.post(this.base+'/puertos',body);
  }

  postAction(msg:string){
    this.socket.emit(this.event,msg);
  }
  getPuertosActivados():any{
    return this.socket
      .fromEvent<any>(this.event)
      .map( data => {
        return data;
      });
  }

  close(){
    this.socket.disconnect();
  }

}
