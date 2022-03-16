import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioI } from '../../models/Usuario.Interface';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { RecursosService } from '../../services/recursos.service';
import { AlertI } from '../../models/complements/AlertI';
import { PropuestaService } from '../../services/propuesta.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AdmobService } from '../../services/publicidad/admob.service';
import { EmpleoI } from '../../models/Empleo.Interface';
import { PropuestaModalComponent } from '../../pages-buscador/buscar/propuesta-modal/propuesta-modal.component';
import { ContratarModalComponent } from '../../pages-buscador/buscar/contratar-modal/contratar-modal.component';

@Component({
  selector: 'app-register-empleador',
  templateUrl: './register-empleador.page.html',
  styleUrls: ['./register-empleador.page.scss'],
})
export class RegisterEmpleadorPage implements OnInit {
  public img1: any = 0;
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
public empleos: EmpleoI[] = [];
  constructor (private alertService:AlertService, 
  private wsUsuario:AuthService,
  private wsRecurso:RecursosService,
  private propuestaService: PropuestaService,
    private auth: AuthService,
    private alertController: AlertController,
    private modalController: ModalController,
    private admobService: AdmobService,
    private wsRecursos: RecursosService) { }


  ngOnInit() {
    this.propuestaService.getAllPropuestasWithUserTipoEmpleo(0, 0, "0",  "0",  "0").subscribe(data => {
      this.empleos = data;
      console.log(this.empleos);
    });
  }

  ver(empleado: EmpleoI) {
    // this.presentAlertPrompt(empleado);
    this.presentModal(empleado);
  }
  async presentModal(empleado: EmpleoI) {
    const modal = await this.modalController.create({
      component: PropuestaModalComponent,
      componentProps: {
        'empleado': empleado,
      }
    });
    return await modal.present();
  }

  async presentModalContract(empleado: EmpleoI) {
    const modal = await this.modalController.create({
      component: ContratarModalComponent,
      componentProps: {
        'propuesta': empleado,
      }
    });
    return await modal.present();
  }
  registrarUser(form:UsuarioI){
    let usuario:UsuarioI;
    if(form.password != form.confirm){
      form.confirm = "";
      return this.alertService.presentAlertMultipleButtons("Oops!!", "Las credenciales no coinciden", "Error");
    }
    form.rol = "empleador";
    var fotoImagen = document.getElementById("fotoImagen");
    
    let fotoImagenResized = this.wsRecurso.resizeImage(fotoImagen);
    
    form.foto = fotoImagenResized;
    form.fechaNacimiento = "2022-03-14";
    form.cv = "n/a";
    usuario = form;
    console.log(form);
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

}
