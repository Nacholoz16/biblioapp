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
      icon:'home-outline',
      name: 'Inicio',
      redirecTo:'/home'
    },
    {
      icon: 'qr-code-sharp',
      name: 'Generar QR',
      redirecTo:'/alert'
    }, 
    {
      icon:'calendar-outline',
      name: 'Feriados',
      redirecTo:'/api'
    },
    {
      icon:'information-circle-outline',
      name: 'Acerca de',
      redirecTo:'/informacion'
    },
    {
      icon:'bug-outline',
      name: 'Mesa ayuda FAQ',
      redirecTo:'/prueba-firebase'
    },
    
    {
      icon:'exit-outline',
      name: 'Cerrar Sesión',
      redirecTo:'/logout'
    }
    
  ];
}
