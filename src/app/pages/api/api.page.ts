import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FeriadosService } from '../../services/feriados.service';
import { Datos } from '../../interfaces/interfaces';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  
  feriados: Datos[] = [];

  constructor(private menuController : MenuController,private feriadosService : FeriadosService) { }

  ngOnInit() {
    this.feriadosService.obtenerFeriados().subscribe(resp => {
      console.log('feriados',resp);
      this.feriados.push(...resp.data)
    });
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

}
