import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario'
import { UsuarioId } from '../interfaces/usuarioId';
import { Salas } from '../interfaces/salas';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  listarUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(environment.apiURL)
  }    

  postUsuario(newUsuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(environment.apiURL,newUsuario)
  }
  listarSalas():Observable<Salas[]>{
    return this.http.get<Salas[]>(environment.URLApi)
  }   
  listarSala(id:number):Observable<Salas>{
    return this.http.get<Salas>('${environment.URLApi}/?id')

  }
  actualizarReserva(id:number,horario:string, hora:string,reservada:boolean){
    return this.http.get<Salas>(environment.apikey)
  }
  getUsuario(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(environment.apiURL)
  }
}
