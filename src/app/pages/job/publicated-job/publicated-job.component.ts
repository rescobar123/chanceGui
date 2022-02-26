import { Component, OnInit } from '@angular/core';
import { PropuestaService } from '../../../services/propuesta.service';
import { EmpleoI } from '../../../models/Empleo.Interface';
import { RecursosService } from '../../../services/recursos.service';
import { TipoEmpleoI } from '../../../models/complements/TipoEmpleoI';
import { AlertI } from '../../../models/complements/AlertI';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-publicated-job',
  templateUrl: './publicated-job.component.html',
  styleUrls: ['./publicated-job.component.scss'],
})
export class PublicatedJobComponent implements OnInit {
  public empleos:EmpleoI[]=[];
  public idTipoEmpleo;
  public estado;
  public user:any;
 
  constructor(
    private propuestaService: PropuestaService,
    private alertService:AlertService,
    private auth: AuthService,
    
    ) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    let idUser:string = this.user.usuario.idUsuario;
    this.propuestaService.getAllPropuestasWithUserTipoEmpleo(0,idUser,0,0,0).subscribe(data=>{
      this.empleos = data;
      console.log(this.empleos);
    });
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
