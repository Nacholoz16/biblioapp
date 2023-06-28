import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Usuario{
  nombre: String,
  apellidos: String,
  correo: String,
  pass: String,
  repass: String
  bloqueado:string
}


const USERS_KEY = 'my-usuarios';

@Injectable({
  providedIn: 'root'
})


export class RegistroService {
  private usuarioStorageKey = 'USERS_KEY';
  private _storage: Storage
  newUsuario: Usuario = <Usuario>{};

  constructor(private storage: Storage) { 
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage= storage;
  }//fin init()

  async addDatos(dato : Usuario):Promise<any>{
    return this.storage.get(USERS_KEY).then((datos : Usuario[])=>{
      if(datos){
        datos.push(dato);
        return this.storage.set(USERS_KEY, datos);
      }else{
        return this.storage.set(USERS_KEY,[dato]);
      }
    })
  }//fin addDatos()

  async getUser(): Promise<Usuario[]>{
    return this.storage.get(USERS_KEY);
  }

  guardarUsuario(usuario: any) {
    this.storage.set(this.usuarioStorageKey, usuario);
  }

  obtenerUsuario() {
    return this.storage.get(this.usuarioStorageKey);
  }

  eliminarUsuario() {
    this.storage.remove(this.usuarioStorageKey);
  }
}


