import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioI } from '../../models/Usuario.Interface';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { RecursosService } from '../../services/recursos.service';
import { AlertI } from '../../models/complements/AlertI';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user:UsuarioI;
  public usuarioCache:any;
  file: File;

  public img1: any = 0;
  public cv: any = 0;
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
    private auth:AuthService,
    private alertService:AlertService, 
    private wsRecurso:RecursosService
  ) {
    
    this.usuarioCache = this.auth.getUser();
    let idUser:string = this.usuarioCache.usuario.idUsuario;
    this.auth.findUser(idUser).subscribe(data=>{
      this.user = data;
      console.log(this.user);
    });
  }

  ngOnInit() {

  }

  logout() {
    console.log("Cerrrando sesino...")
    this.auth.logout();
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
