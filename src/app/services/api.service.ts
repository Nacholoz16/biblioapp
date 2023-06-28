import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario'
import { UsuarioId } from '../interfaces/usuarioId';
import { Salas } from '../interfaces/salas';
import { Reservada } from '../interfaces/reservas' 
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
  mostrarSalas():Observable<Salas[]>{
    return this.http.get<Salas[]>(environment.URLApi)
  }   
  listarSala(id:number):Observable<Salas>{
    return this.http.get<Salas>('${environment.URLApi}/?id')
  }

  listarReservas():Observable<Reservada[]>{
    return this.http.get<Reservada[]>(environment.apikey)
  }   

  actualizarReserva(newReserva:Reservada){
    return this.http.post<Reservada>(environment.apikey,newReserva)
  }

  getUsuario(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(environment.apiURL)
  }

  cambiarEstadoReservada(dia: string, hora: string, reservada: boolean): Observable<any> {
    const payload = {
      dia: {
        hora: {
          reservada: reservada
        }
      }
    };

    return this.http.put<any>(`${environment.URLApi}/${dia}/${hora}`, payload);
  }

  eliminarReserva(id: number): Observable<any> {
    const url = `http://localhost:3100/reservas/${id}`; // Reemplaza "ruta-del-endpoint" con la ruta real del endpoint para eliminar reservas
    
    return this.http.delete(url);
  }
}
/*id:number,horario:string, hora:string,reservada:boolean*/