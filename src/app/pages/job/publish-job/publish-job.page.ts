import { Component, OnInit, ViewChild,  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { DatosGeneralesI, DatosUbicacionI, DatosConocimientoI, EmpleoI } from '../../../models/Empleo.Interface';
import { PropuestaService } from '../../../services/propuesta.service';
import { AlertI } from '../../../models/complements/AlertI';
import { AlertService } from '../../../services/alert.service';
import { RecursosService } from '../../../services/recursos.service';
import { TipoEmpleoI } from '../../../models/complements/TipoEmpleoI';
import { AuthService } from '../../../services/auth.service';
import { UsuarioI } from '../../../models/Usuario.Interface';
@Component({
  selector: 'app-publish-job',
  templateUrl: './publish-job.page.html',
  styleUrls: ['./publish-job.page.scss'],
})

export class PublishJobPage implements OnInit {
  @ViewChild('mySlider',null)  slides: IonSlides;
  public user:any;
  public departamentosMunicipios:any;
  public datosGenerales:DatosGeneralesI;
  public datosCertificado:DatosConocimientoI;
  public datosUbicacion:DatosUbicacionI;
  public img1: any;
  public tiposEmpleos:TipoEmpleoI[]=[];
  file: File;
   slideOpts = {
    initialSlide: 1,
  };
    datosGeneralesForm = new FormGroup({
      disponibilidad:  new FormControl(''),
      diasLaborables: new FormControl(''),
      tipoEmpleo: new FormControl(''),
      precioEstimadoHora: new FormControl(''),
  });

  datosUbicacionForm = new FormGroup({
    municipios:  new FormControl(''),
});

  

  certificacionesForm = new FormGroup({
    certificado: new FormControl(''),
    descripcion: new FormControl(' '),
  });
  constructor(private activeRouter:ActivatedRoute, private auth: AuthService, private ws:PropuestaService, private wsRecursos: RecursosService, private alertService:AlertService) {
    
   }

  ngOnInit() {
    this.departamentosMunicipios =  this.wsRecursos.getAllLugares();
    this.wsRecursos.getAllTiposEmpleos().subscribe(data=>{
      this.tiposEmpleos = data;
      console.log(this.tiposEmpleos);
    });

    //Obtiene el usuario del wtoken;
    this.user = this.auth.getUser();
    console.log("User ** " , this.user.usuario.idUsuario);
    
  }
  guardarDatosGenerales(form:DatosGeneralesI){
    this.datosGenerales = form;
    console.log(this.datosGenerales);
    this.slides.slideNext();
  }
  guardarDatosLugares(form:DatosUbicacionI){
    this.datosUbicacion = form
    this.slides.slideNext();
    console.log(this.datosUbicacion);
  }
  publicarPropuesta(form:DatosConocimientoI){
    this.datosCertificado = form;
    let propuesta:string = '{ "certificado": "'+this.img1+'", "descripcion": "'+this.datosCertificado.descripcion+'", "diasLaborables": "'+this.datosGenerales.diasLaborables+'", "disponibilidad" : "'+this.datosGenerales.disponibilidad+'", "idTipoPropuesta": "'+this.datosGenerales.tipoEmpleo+'", "lugaresLaborables": "'+this.datosUbicacion.municipios+'", "precioPorHora": "'+this.datosGenerales.precioEstimadoHora+'", "usuarioCreo": {"idUsuario": '+this.user.usuario.idUsuario+' } }';
    let propuestaOb:EmpleoI;
    propuestaOb = JSON.parse(propuesta);
    
    this.ws.postPropuesta(propuestaOb).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
        this.alertService.presentAlertMultipleButtons("Propuesta publicada!!", alerta.mensaje, "");
        console.log("Propuesta publicada...");
        this.datosGeneralesForm.reset();
        this.datosUbicacionForm.reset();
        this.certificacionesForm.reset();
        this.img1 = "";
      }else{
       this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });
  }
  changeListener($event) : void {
    this.file = $event.target.files[0];
  }
  saveProfile_click() {
    console.log("saveProfile_click");
    // Add your code here
   /* this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${this.uid}`).set(this.profile)
        .then(() => {
          this.uploadProfileImage();
          this.navCtrl.pop();
        });
    })*/
  }

  uploadProfileImage(){
    console.log("uploadProfileImage");
    /*let fileRef = firebase.storage().ref('profileImages/' + this.uid + ".jpg");
    fileRef.put(this.file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });*/
  }

  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
        console.log(this.img1);
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file);
  }

}
