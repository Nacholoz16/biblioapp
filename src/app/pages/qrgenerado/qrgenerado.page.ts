import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { Reservada } from 'src/app/interfaces/reservas';
import { ApiService } from 'src/app/services/api.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-qrgenerado',
  templateUrl: './qrgenerado.page.html',
  styleUrls: ['./qrgenerado.page.scss'],
})



export class QrgeneradoPage implements OnInit {
  handleRefresh(event) {
    setTimeout(() => {
      window.location.reload();
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
  handlerMessage = '';
  roleMessage = '';

  reservasCoincidentes: any[] = [];

  salas: Reservada[] = [];
  identificador=0;
  reserva: {};
  mostrarReserva: {};

  newReserva: Reservada = {
    id: 0,
    nombre: "",
    apellidos: "",
    correo: "",
    sala: 0,
    horarios: "",
    hora: "",
  }



  constructor(private alertController: AlertController,
    private menuController: MenuController,
    private navCtrl: NavController,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private registro: RegistroService) {

    let usuarioArray = [];
  }
  //for (let obj of this.usuario) {
  // if (this.newUsuario.correo == obj.correo) {
  // existe = 1;
  //   console.log('duplicado')
  //     break
  //     }
  //     }
  ngOnInit(){
    
    this.ngOnIniti() 
  }
  async ngOnIniti() {
    this.presentLoadingText()
    const datosUsuario = await this.registro.obtenerUsuario();
    const reservas: any[] = [];
    this.apiService.listarReservas().subscribe(datoReserva => {
      this.salas = datoReserva;
      for (let obj of this.salas) {
        if (obj.correo == datosUsuario.correo) {
          console.log('Datos encontrados:', obj);
          this.reservasCoincidentes.push(obj);
          this.identificador = obj.id
          reservas.push({
            nombre: obj.nombre,
            apellidos: obj.apellidos,
            correo: obj.correo,
            sala: obj.sala,
            horarios: obj.horarios,
            hora: obj.hora,
          });
        }
      }
      console.log('Reservas:', reservas);
      // Puedes asignar el array `reservas` a una propiedad de la clase para utilizarlo en el HTML
      this.reserva = reservas;
      
    });
    
  }

 async eliminarReserva(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Deseas cancelar la reserva?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Canceló la cancelación de reserva');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.apiService.eliminarReserva(id).subscribe(
              () => {
                this.deletedMsg();
                window.location.reload();
                console.log('Reserva eliminada correctamente');
                // Realiza cualquier acción adicional después de eliminar la reserva
              },
              (error) => {
                console.error('Error al eliminar la reserva:', error);
                // Maneja el error de acuerdo a tus necesidades
              }
            );
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async deletedMsg() {
    const alert = await this.alertController.create({
      header: 'Reserva Cancelada',
      message: 'La reserva ha sido cancelada exitosamente.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
  






  mostrarMenu() {
    this.menuController.open('first');
  }







//-----------------------------------------------------------------------------------------------------------------------
  async presentLoadingText() { //cuadro de espera 
    let loading = this.loadingController.create({
      spinner: 'lines-sharp',
      message: 'Cargando, por favor espere...'
    });
    (await loading).present();

    setTimeout(async () => {
      this.navCtrl.navigateRoot('qrgenerado');
    }, 3000);

    setTimeout(async () => {
      (await loading).dismiss();
    }, 2000);
  }
  async alertMsg() {
    const alert = await this.alertController.create({
      header: 'Aun no has reservado',
      subHeader: 'Ve a reservar ahora!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.navCtrl.navigateRoot('/home');
          }
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.navCtrl.navigateRoot('/alert');
          }
        }
      ]
    });
  
    await alert.present();
  }

  
}//cierre de la clase