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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
/*/firebase modulos
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'*/

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, QRCodeModule,IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
            IonicStorageModule.forRoot({
              name:'mydb',
              driverOrder:[Drivers.IndexedDB,Drivers.LocalStorage]
            }),
            provideFirebaseApp(() => initializeApp(environment.firebase)),
            provideFirestore(() => getFirestore()),
            ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})


export class AppModule {}