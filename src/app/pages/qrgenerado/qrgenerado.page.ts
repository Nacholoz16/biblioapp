import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-qrgenerado',
  templateUrl: './qrgenerado.page.html',
  styleUrls: ['./qrgenerado.page.scss'],
})
export class QrgeneradoPage implements OnInit {
  handlerMessage = '';
  roleMessage = '';

  constructor(private alertController: AlertController,
              private menuController: MenuController,
              private navCtrl: NavController) { }

  ngOnInit() {
  }
  mostrarMenu(){
    this.menuController.open('first');
  }

  async SaludoOk() {    //1ra Alerta
    let date: Date = new Date();
    const alert = await this.alertController.create({
      
      header: 'Codigo Borrado',
      message: 'redirigiendo a Generar QR',
      buttons: [
        {text:'Listo',
        handler: data => {
          this.navCtrl.navigateRoot('/alert')
        }}],
    });

    await alert.present();
  }


  async Confirmar() {  //2da Alerta
    const alert = await this.alertController.create({
      header: '¡Alerta!',
      subHeader:'¿Desea analizar su dispositivo?',
      buttons: [
        {
          text: 'No', //este define lo que se muestra
          role: 'cancel', //esta es la funcion, NO se toca
          handler: () => {
            this.handlerMessage = 'El usuario no quiso analizar';
          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'El usuario si quiso analizar';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  async inputAlert() {
    const alert = await this.alertController.create({
      header: 'Por Favor Ingresa tu información',
      buttons: ['OK'],
      inputs: [
        {
          placeholder: 'Nombre',
        },
        {
          placeholder: 'Nickname (max 8 characters)',
          attributes: {
            maxlength: 8,
          },
        },
        {
          type: 'number',
          placeholder: 'Edad',
          min: 1,
          max: 100,
        },
        {
          type: 'textarea',
          placeholder: 'Acerca de ti.',
        },
      ],
    });

    await alert.present();
  }

  async leerqr() {    //1ra Alerta
    let date: Date = new Date();
    const alert = await this.alertController.create({
      
      header: 'Solicitud de acceso a la cámara',
      message: '*Accediendo a la cámara...*',
      buttons: [
        {text:'Ok',
        handler: data => {
          this.navCtrl.navigateRoot('/alert')
        }}],
    });

    await alert.present();
  }

}