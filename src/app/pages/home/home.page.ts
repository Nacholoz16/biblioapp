import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { RegistroService, Usuario } from '../../services/registro.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuarios: Usuario[] = [];
  subscribe: any;
  constructor(private menuController: MenuController,
    private registroService: RegistroService,
    private plataform: Platform) {
    this.subscribe = this.plataform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "HomePage") {
        if (window.confirm("¿Seguro quieres salir de la aplicación?")) {
          navigator["app"].exitApp();
          localStorage.removeItem('ingresado')
        }
      }

    })
  }

  ngOnInit() {
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  async mostrarNombre() {

  }
}
