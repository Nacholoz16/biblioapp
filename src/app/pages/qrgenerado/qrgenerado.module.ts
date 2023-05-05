import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrgeneradoPageRoutingModule } from './qrgenerado-routing.module';

import { QrgeneradoPage } from './qrgenerado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrgeneradoPageRoutingModule
  ],
  declarations: [QrgeneradoPage]
})
export class QrgeneradoPageModule {}
