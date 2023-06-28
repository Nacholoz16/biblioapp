import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';

import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { ApiService } from 'src/app/services/api.service';
import { RegistroService } from 'src/app/services/registro.service'; 

@Component({
  selector: 'app-registrodocente',
  templateUrl: './registrodocente.page.html',
  styleUrls: ['./registrodocente.page.scss'],
})

export class RegistrodocentePage implements OnInit {
  formularioRegistro: FormGroup;

  newUsuario: Usuario = {
    nombre: "matias",
    apellidos: "Salazar Soto",
    correo: "ma.salazar@duocuc.cl",
    pass: "1234",
    repass: "1234",
    bloqueado:null
  }

  usuario: Usuario[] = [];

  user: Usuario = <Usuario>{};

  constructor(private registro: RegistroService,private navController: NavController, private apiService: ApiService, private alertController: AlertController, private toastController: ToastController, private fb: FormBuilder) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-z ]+$/)]),
      'apellidos': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-z ]+$/)]),
      'correo': new FormControl("", [Validators.required, Validators.pattern(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)]),
      'pass': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      'repass': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
    })
  }

  ngOnInit() {
  }

  RegistrarUsuario() {
    this.apiService.postUsuario(this.newUsuario).subscribe()
  }




  async CrearUsuario() {

    var form = this.formularioRegistro.value;
    var existe = 0;
    if (this.formularioRegistro.invalid) {
      this.alertError();
      console.log('error')
    }
    else {
      if (form.repass != form.pass) {
        this.alertErrorPass();
        console.log('errorPass')
      } else {
        const dominiosPermitidos = ['@duocuc.cl', '@profesor.duoc.cl', '@alumno.duoc.cl'];
        const dominioEncontrado = dominiosPermitidos.find(dominio => form.correo.endsWith(dominio));
        if (dominioEncontrado) {
          this.newUsuario.nombre = form.nombre;
          this.newUsuario.apellidos = form.apellidos;
          this.newUsuario.correo = form.correo;
          this.newUsuario.pass = form.pass;
          this.newUsuario.repass = form.repass;
          this.newUsuario.bloqueado = null;

          this.apiService.listarUsuarios().subscribe(datos => {
            this.usuario = datos;

            if (!datos || datos.length == 0) {
              this.apiService.postUsuario(this.newUsuario).subscribe();
              this.showToast('Usuario Creado satisfactoriamente');
              this.formularioRegistro.reset();
              /* this.navController.navigateRoot('login');*/
            } else {

              for (let obj of this.usuario) {
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
                this.apiService.postUsuario(this.newUsuario).subscribe();
                this.registro.guardarUsuario(this.newUsuario)
                this.showToast('Usuario Creado!');
                console.log(this.newUsuario.correo);
              }
              this.formularioRegistro.reset();
              /* this.navController.navigateRoot('login');*/

            }

          })
        }else{
          console.log('el correo no es valido')
          this.alertCorreo();
          return false 
          
        }
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
  async alertCorreo() {
    const alert = await this.alertController.create({
      header: 'El correo debe ser institucional',
      message: 'El correo debe coincidir con los registros',
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
