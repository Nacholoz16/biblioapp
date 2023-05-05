import { NgModule } from '@angular/core';
import { Ng9RutModule} from 'Ng9-rut';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrodocentePageRoutingModule } from './registrodocente-routing.module';

import { RegistrodocentePage } from './registrodocente.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng9RutModule,
    IonicModule,
    RegistrodocentePageRoutingModule
  ],
  declarations: [RegistrodocentePage]
})
export class RegistrodocentePageModule {}
