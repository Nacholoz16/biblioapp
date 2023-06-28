import { Component } from '@angular/core';


interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{

  componentes : Componente[] = [
    {
      icon:'home',
      name: 'Inicio',
      redirecTo:'/home'
    },
    {
      icon: 'qr-code-sharp',
      name: 'Generar QR',
      redirecTo:'/alert'
    },
    
    {
      icon:'book',
      name: 'Mi reserva',
      redirecTo:'/qrgenerado'
    },
    {
      icon:'calendar',
      name: 'Feriados',
      redirecTo:'/api'
    },
    {
      icon:'help-circle',
      name: 'Mesa ayuda FAQ',
      redirecTo:'/prueba-firebase'
     },
    {
      icon:'information-circle',
      name: 'Acerca de',
      redirecTo:'/informacion'
    },
    
    {
      icon:'exit',
      name: 'Cerrar Sesión',
      redirecTo:'/logout'
    }
    

  ];

}



