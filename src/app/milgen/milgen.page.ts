import { UsuarioI } from './../models/Usuario.Interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { RecursosService } from '../services/recursos.service';
import { AlertI } from '../models/complements/AlertI';
import { FormGroup, FormControl } from '@angular/forms';
import { MilgenI } from '../models/Milgen.Interface';

@Component({
  selector: 'app-milgen',
  templateUrl: './milgen.page.html',
  styleUrls: ['./milgen.page.scss'],
})
export class MilgenPage implements OnInit {
  registerForm = new FormGroup({
    idPedido:  new FormControl(''),
    sku: new FormControl(''),
    talla: new FormControl(''),
    precio: new FormControl(''),
    descripcion: new FormControl(''),
    vendedora: new FormControl(''),
    fechaPedido: new FormControl(''),
});
  constructor( private auth:AuthService,
    private alertService:AlertService, 
    private wsRecurso:RecursosService) { }

  ngOnInit() {
  }
  registrarUser(form:MilgenI){
    let usuario:UsuarioI;
    console.log(form);
    this.auth.insertarUsuario(usuario).subscribe( data => {
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
