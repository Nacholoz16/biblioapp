import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  

  constructor(private menuController : MenuController) { }
  
  ngOnInit() {
    
  }

}

