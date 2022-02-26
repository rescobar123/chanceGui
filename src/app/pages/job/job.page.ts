
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IonSlides, ModalController } from '@ionic/angular';
import { PublicatedJobComponent } from './publicated-job/publicated-job.component';
import { PropertyBindingType } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleoI } from '../../models/Empleo.Interface';
import { PropuestaService } from '../../services/propuesta.service';
import { AlertI } from '../../models/complements/AlertI';
import { AlertService } from '../../services/alert.service';




@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {
  @ViewChild('mySlider',null)  slides: IonSlides;
  public job:string;
  public empleos:EmpleoI[]=[];
  public idTipoEmpleo;
  public estado;
  public user:any;
  constructor(private auth: AuthService, private modalController: ModalController,
    private router:Router, private propuestaService: PropuestaService, private alertService:AlertService) { 
    
  }

  ngOnInit() {
    this.job = "propuesta";
    this.user = this.auth.getUser();
    let idUser:string = this.user.usuario.idUsuario;
    this.propuestaService.getAllPropuestasWithUserTipoEmpleo(0,idUser,0,0,0).subscribe(data=>{
      this.empleos = data;
      console.log(this.empleos);
    });
  }

  ionViewWillEnter() {
    this.user = this.auth.getUser();
  }
  logout() {
    console.log("Cerrrando sesino...")
    this.auth.logout();
  }
  public changeJob(jobSegment:string){
    this.job = jobSegment;
    console.log(jobSegment);
  }

  deletePropuesta(idProp:number){
    let idPropuesta = '{ "idPropuesta":' + idProp +' }';
    let propuestaOb:EmpleoI;
    propuestaOb = JSON.parse(idPropuesta);
    this.propuestaService.deletePropuesta(propuestaOb).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
        this.alertService.presentAlertMultipleButtons("Propuesta eliminada!!", alerta.mensaje, "");
        console.log("Propuesta eliminada...");
        this.ngOnInit();
      }else{
       this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });
  }

  cambiarEstadoPropuesta(idProp:number, estado:number){
    let idPropuesta = '{ "idPropuesta":' + idProp +', "estado": '+ estado +' }';
    let propuestaOb:EmpleoI;
    propuestaOb = JSON.parse(idPropuesta);
    this.propuestaService.updatePropuesta(propuestaOb).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
        this.alertService.presentAlertMultipleButtons("Propuesta actualizada!!", alerta.mensaje, "");
        console.log("Propuesta actualizada...");
        this.ngOnInit();
      }else{
       this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });
  }

}
