import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule} from '@angular/common/http';

//Storage Modulos
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
//QRmodulos 
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, QRCodeModule,IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
            IonicStorageModule.forRoot({
              name:'mydb',
              driverOrder:[Drivers.IndexedDB,Drivers.LocalStorage]
            }),
            ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})


export class AppModule {}