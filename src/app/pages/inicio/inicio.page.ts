import { Component, OnInit } from '@angular/core';
import { NavController,AlertController, Platform } from  '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { FormGroup,FormControl,FormBuilder,Validator, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  formularioLogin: FormGroup;
  usuario : Usuario[] = [];
  subscribe:any;
  constructor(private navController: NavController,
              private alertController: AlertController,
              private apiService: ApiService,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private fb: FormBuilder,
              private plataform: Platform) { 
                this.formularioLogin = this.fb.group({
                  'correo': new FormControl("",Validators.required),
                  'pass':new FormControl("",Validators.required),
                })
                this.subscribe = this.plataform.backButton.subscribeWithPriority(666666, () => {
                  if (this.constructor.name == "HomePage") {
                    if (window.confirm("¿Seguro quieres salir de la aplicación?")) {
                      navigator["app"].exitApp();
                      localStorage.removeItem('ingresado')
                    }
                  }
            
                })
              }

  ngOnInit() {
  }

  async Ingresar(){
    var f = this.formularioLogin.value;
    var a = 0;
    var nom = '';
    this.apiService.listarUsuarios().subscribe(datos=> {
      this.usuario=datos;
      if (!datos || datos.length==0){
        this.alertMsg();
        return null;
      }
      for (let obj of this.usuario){
        if (obj.correo == f.correo && obj.pass == f.pass){
          obj.nombre = obj.nombre.charAt(0).toUpperCase() + obj.nombre.slice(1);
          obj.apellidos = obj.apellidos.charAt(0).toUpperCase() + obj.apellidos.slice(1);
          nom = 'Bienvenido ' + obj.nombre + ' '+obj.apellidos; //mensaje de bienvenida

          a = 1;
          console.log(obj);
          console.log('Usuario ingresado');
          localStorage.setItem('ingresado','true');
          this.navController.navigateRoot('home');          
          this.showToast(nom);
          this.presentLoadingText();
        }
      }
      if(a==0){
        this.alertMsg();
      }
    })
  }
  async alertMsg(){ //alerta inicio sesion fallido
    const alert = await this.alertController.create({
      header:'CUENTA NO REGISTRADA',
      message:'Los datos ingresados no estan registrados!',
      buttons:['Aceptar']
    })
    await alert.present();
    return;
  }

  async showToast(msg){ //mensaje bottom bienvenido
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    await toast.present();
  }
  
  async presentLoadingText() { //cuadro de espera 
    let loading =  this.loadingController.create({
      spinner: 'lines-sharp',
      message: 'Cargando, por favor espere...'
    });
    (await loading).present();

    setTimeout(async() => {
      this.navController.navigateRoot('home');
    }, 3000);
  
    setTimeout(async () => {
    (await loading).dismiss();
    }, 2000);
  }
}