import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebaFirebasePageRoutingModule } from './prueba-firebase-routing.module';

import { PruebaFirebasePage } from './prueba-firebase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebaFirebasePageRoutingModule
  ],
  declarations: [PruebaFirebasePage]
})
export class PruebaFirebasePageModule {}
