import { Component, OnInit } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';
@Component({
  selector: 'app-prueba-firebase',
  templateUrl: './prueba-firebase.page.html',
  styleUrls: ['./prueba-firebase.page.scss'],
})
export class PruebaFirebasePage implements OnInit {

  constructor(private menuController : MenuController) { }

  ngOnInit() {
  }

}


