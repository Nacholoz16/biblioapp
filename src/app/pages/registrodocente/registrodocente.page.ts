import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { RegistroService, Usuario } from '../../services/registro.service';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { Datos } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-registrodocente',
  templateUrl: './registrodocente.page.html',
  styleUrls: ['./registrodocente.page.scss'],
})

export class RegistrodocentePage implements OnInit {
  formularioRegistro: FormGroup;
  newUsuario: Usuario = <Usuario>{};
  usuarios: Usuario[] = [];


  constructor(private navController: NavController, private registroService: RegistroService, private alertController: AlertController, private toastController: ToastController, private fb: FormBuilder) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-z ]+$/)]),
      'apellidos': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-z ]+$/)]),
      'correo': new FormControl("", [Validators.required, Validators.pattern(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)]),
      'password': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'confirmPass': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
    })
  }

  ngOnInit() {
  }
  async CrearUsuario() {

    var form = this.formularioRegistro.value;
    var existe = 0;

    if (this.formularioRegistro.invalid) {
      this.alertError();
      console.log('error')
    }
    else {
      if (form.confirmPass != form.password) {
        this.alertErrorPass();
        console.log('errorPass')
      } else {
        this.newUsuario.nombre = form.nombre;
        this.newUsuario.apellidos = form.apellidos;
        this.newUsuario.correo = form.correo;
        this.newUsuario.password = form.password;
        this.newUsuario.confirmPass = form.confirmPass;

        this.registroService.getUser().then(datos => {
        this.usuarios = datos;

          if (!datos || datos.length == 0) {
            this.registroService.addDatos(this.newUsuario).then(dato => {
              this.newUsuario = <Usuario>{};
              this.showToast('Usuario Creado satisfactoriamente');
            });
            this.formularioRegistro.reset();
            this.navController.navigateRoot('login');
          } else {

            for (let obj of this.usuarios) {
              if (this.newUsuario.correo == obj.correo) {
                existe = 1;
                console.log('duplicado')
                break
              }
            }


            if (existe == 1) {
              this.alertCorreoDuplex();
              console.log('error correo duplicado')

            } else {
              this.registroService.addDatos(this.newUsuario).then(dato => {
                this.newUsuario = <Usuario>{};
                this.showToast('Usuario Creado!');
                console.log('user created');
              });
            }
            this.formularioRegistro.reset();
            this.navController.navigateRoot('login');

          }

      })
      }
    }
  }
  async alertCorreoDuplex() {
    const alert = await this.alertController.create({
      header: 'El correo existe',
      subHeader: 'Este correo ya existe,¿Desea iniciar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.navController.navigateRoot('/inicio');
          },
        },
      ],
    });

    await alert.present();
  }

  async alertErrorPass() {
    const alert = await this.alertController.create({
      header: 'Constraseñas invalidas',
      message: 'Las contraseñas deben coincidir',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

  async alertError() {
    const alert = await this.alertController.create({
      header: 'Error..',
      message: 'Debe completar todos los datos',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    await toast.present();
  }


}


/*
saludo
api*/
