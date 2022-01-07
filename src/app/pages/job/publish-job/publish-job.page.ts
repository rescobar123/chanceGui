import { Component, OnInit, ViewChild,  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { DatosGeneralesI, DatosUbicacionI, DatosConocimientoI } from '../../../models/Empleo.Interface';
@Component({
  selector: 'app-publish-job',
  templateUrl: './publish-job.page.html',
  styleUrls: ['./publish-job.page.scss'],
})

export class PublishJobPage implements OnInit {
  @ViewChild('mySlider',null)  slides: IonSlides;
  public empleo:string;
  public datosGenerales:DatosGeneralesI;
  public datosCertificado:DatosConocimientoI;
  public datosUbicacion:DatosUbicacionI;
  file: File;
   slideOpts = {
    initialSlide: 1,
  };

    datosGeneralesForm = new FormGroup({
      disponibilidad:  new FormControl(''),
      diasLaborables: new FormControl(''),
  });

  datosUbicacionForm = new FormGroup({
    departamentos:  new FormControl(''),
});

  

  certificacionesForm = new FormGroup({
    certificado: new FormControl(''),
    descripcion: new FormControl(' '),
  });
  constructor(private activeRouter:ActivatedRoute) {
    
   }

  ngOnInit() {
    this.empleo = this.activeRouter.snapshot.paramMap.get("empleo");
  }
  guardarDatosGenerales(form:DatosGeneralesI){
    this.datosGenerales = form;
    console.log(this.datosGenerales);
    this.slides.slideNext();
  }
  guardarDatosLugares(form:DatosUbicacionI){
    this.slides.slideNext();
    console.log(this.datosGenerales);
  }
  publicarPropuesta(form:DatosConocimientoI){

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

}
