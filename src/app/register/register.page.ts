import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioI } from '../models/Usuario.Interface';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { AlertI } from '../models/complements/AlertI';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = new FormGroup({
    nombres:  new FormControl(''),
    apellidos: new FormControl(''),
    direccion: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    educacion: new FormControl(''),
    genero: new FormControl(''),
    password: new FormControl(''),
    confirm: new FormControl(''),
    email: new FormControl(''),
    vacunaCovid: new FormControl(''),
    rol: new FormControl(''),
    foto: new FormControl(''),
    cv: new FormControl(''),
});

  constructor(private alertService:AlertService, private wsUsuario:AuthService) { }

  ngOnInit() {
  }

  registrarUser(form:UsuarioI){
    let usuario:UsuarioI;
    if(form.password != form.confirm){
      form.confirm = "";
      return this.alertService.presentAlertMultipleButtons("Oops!!", "Las credenciales no coinciden", "Error");
    }
    form.rol = "empleado";
    form.foto = "";
    form.cv = "";
    usuario = form;
    console.log(usuario);
    this.wsUsuario.insertarUsuario(usuario).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
        this.alertService.presentAlertMultipleButtons("Usuario Creado!!", alerta.mensaje, "");
        console.log("Propuesta publicada...");
        this.registerForm.reset();
      }else{
       this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });

  }
}