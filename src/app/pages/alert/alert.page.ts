import { Component, OnInit } from '@angular/core';
import { AlertController,MenuController,NavController,ToastController } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode/public-api';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {
  handlerMessage = '';
  roleMessage = '';
  qrCodeString='';

  constructor(private alertController: AlertController,
    private menuController: MenuController,
    private navCtrl: NavController,
    private toastController: ToastController) { }

  ngOnInit() {
  }
  mostrarMenu() {
    this.menuController.open('first');
  }

  registro={
    dia:'',
    mes:'',
    ano:'2022',
    hora:'',
    min:'',
    seccion:'',
    ramo:''}

  async crearQr() {    //alerta generar codigo

    let date: Date = new Date();
    const alert = await this.alertController.create({

      header: 'Codigo Generado',
      message: 'Se registró: ' + this.registro.dia + '/' + this.registro.mes + '/' + this.registro.ano + ' Hora: ' + this.registro.hora + ':' + this.registro.min + " sección: " + this.registro.seccion + " ramo: " + this.registro.ramo,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Listo',
          role: 'confirm',
          handler: data => {
          this.qrCodeString=this.registro.dia + '/' + this.registro.mes + '/' + this.registro.ano + ' Hora: ' + this.registro.hora + ':' + this.registro.min + " sección: " + this.registro.seccion + " ramo: " + this.registro.ramo;
          },
        },

      ],
    });

    await alert.present();
    console.log('qr generado')
  }

  async borrarQr(){
    window.location.reload();
    this.qrCodeString = '';
    this.showToast();
  }
async showToast() {
  const toast = await this.toastController.create({
    message: 'Se ha borrado el codigo QR',
    duration: 1000
  });
  toast.present();
}


  }

/**no se usan  */
 /* async Confirmar() {  //2da Alerta 2 botones si/no
    const alert = await this.alertController.create({
      header: '¡Alerta!',
      subHeader: '¿Desea analizar su dispositivo?',
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
Alerta formulario
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
  }*/

