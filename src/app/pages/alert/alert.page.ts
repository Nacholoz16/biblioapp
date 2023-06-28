import { Component, OnInit } from '@angular/core';
import { AlertController,MenuController,NavController,ToastController } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode/public-api';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Reservada } from 'src/app/interfaces/reservas';
import { RegistroService } from 'src/app/services/registro.service';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {
  handlerMessage = '';
  roleMessage = '';
  qrCodeString='';
  usuario = [];
  
  constructor(private alertController: AlertController,
    private menuController: MenuController,
    private navCtrl: NavController,
    private toastController: ToastController, 
    private apiService:ApiService, private registro:RegistroService) { }

  ngOnInit() {
    this.apiService.mostrarSalas().subscribe((salas) => {
      this.salas = salas;
    }); 
  }
  mostrarMenu() {
    this.menuController.open('first');
  }
  
  newReserva: Reservada = {
    id:0,
    nombre:"",
    apellidos:"",
    correo:"",
    sala: 0,
    horarios:"",
    hora:"",
    }
    block = "on"
  salas = []


  selectedId: number;
  selectedHorario: string;
  selectedHora: string;
  reservada:boolean;



  onIdChange() {
    this.apiService.mostrarSalas().subscribe((salas) => {
      this.salas = salas;
    });  
    this.selectedHorario = null;
    this.selectedHora = null;
  }
  

  onHorarioChange() {
    this.selectedHora = null;
  }

  onHoraSelect() {
    this.selectedHora = null;
  }

  getHorariosForId(id: number): string[] {
    const sala = this.salas.find(sala => sala.id === id);
    if (sala) {
      return Object.keys(sala.horarios);
    }
    return [];
  }

  getHorasForHorario(horario: string): any[] {
    const sala = this.salas.find(sala => sala.id === this.selectedId);
    if (sala && sala.horarios.hasOwnProperty(horario)) {
      return sala.horarios[horario];
    }
    return [];
  }


  async crearQr() {    //alerta generar codigo
    const datosUsuario = await this.registro.obtenerUsuario();

    console.log("usuario: ",datosUsuario)
    let date: Date = new Date();
    const alert = await this.alertController.create({

      header: 'Codigo Generado',
      message: 'Se registró la ' + 'Sala: ' + this.selectedId + ' para el día ' + this.selectedHorario + ' a las: ' + this.selectedHora,
      //message: 'Se registró: ' + this.registro.dia + '/' + this.registro.mes + '/' + this.registro.ano + ' Hora: ' + this.registro.hora + ':' + this.registro.min + " sección: " + this.registro.seccion + " ramo: " + this.registro.ramo,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Listo',
          role: 'confirm',
          handler: data => {
            //this.qrCodeString=this.registro.dia + '/' + this.registro.mes + '/' + this.registro.ano + ' Hora: ' + this.registro.hora + ':' + this.registro.min + " sección: " + this.registro.seccion + " ramo: " + this.registro.ramo;
            console.log("estado: ",datosUsuario.bloqueado)
            if(datosUsuario.bloqueado == "on"){ 
              this.mostrarAlerta();
            }else{
            this.reservada = true;
            this.qrCodeString=this.selectedId + '/' + this.selectedHora + '/' + this.selectedHorario ;
            this.newReserva.sala = this.selectedId,
            this.newReserva.nombre = datosUsuario.nombre,
            this.newReserva.apellidos = datosUsuario.apellidos,
            this.newReserva.correo = datosUsuario.correo,
            this.newReserva.hora = this.selectedHora,
            this.newReserva.horarios = this.selectedHorario,
            this.apiService.actualizarReserva(this.newReserva).subscribe();
            this.apiService.cambiarEstadoReservada(this.selectedHorario,this.selectedHora,this.reservada).subscribe(()=>{console.log("Estado de reservada cambiado");},(error)=>{console.log("Error al cambiar el estado reservada")})
            //this.apiService.actualizarReserva(this.selectedId,this.selectedHora,this.selectedHorario,this.reservada).subscribe();
         } },
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

async mostrarAlerta() {
  const alert = await this.alertController.create({
    header: 'Alerta',
    message: 'Usted está bloqueado, avise a un administrador',
    buttons: [
      {
        text: 'Aceptar',
        handler: () => {
          this.navCtrl.navigateRoot(['/home']); // Navegar al home
        }
      }
    ]
  });

  await alert.present();
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

