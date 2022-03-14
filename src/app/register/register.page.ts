import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioI } from '../models/Usuario.Interface';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { AlertI } from '../models/complements/AlertI';
import { RecursosService } from '../services/recursos.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('mySlider',null)  slides: IonSlides;
  public img1: any = 0;
  public cv: any = 0;
  public tipoCuenta:any;
  slideOpts = {
    initialSlide: 1,
  };
 
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

  constructor(
    private alertService:AlertService, 
    private wsUsuario:AuthService,
    private wsRecurso:RecursosService) { }

  ngOnInit() {
  }

  registrarUser(form:UsuarioI){
    let usuario:UsuarioI;
    if(form.password != form.confirm){
      form.confirm = "";
      return this.alertService.presentAlertMultipleButtons("Oops!!", "Las credenciales no coinciden", "Error");
    }
    form.rol = "empleado";
    var cvImagen = document.getElementById("cvImagen");
    var fotoImagen = document.getElementById("fotoImagen");
    
    let cvImagenResized =this.wsRecurso.resizeImage(cvImagen);
    let fotoImagenResized = this.wsRecurso.resizeImage(fotoImagen);
    
    form.foto = fotoImagenResized;
    form.cv = cvImagenResized;
    usuario = form;
    console.log(form.foto);
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

  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
        //console.log(this.img1);
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file);
  }

  fileChangeCv(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.cv = event.target.result;
        //console.log(this.img1);
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file);
  }

  siguiente(slide:number, form:UsuarioI){
    console.log(slide);
    if(slide == 1){
      console.log(this.tipoCuenta);
    }
    this.slides.slideNext();
  }
  anterior(){
    this.slides.slidePrev();
  }

}