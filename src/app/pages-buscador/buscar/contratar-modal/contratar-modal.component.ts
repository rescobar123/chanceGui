import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { EmpleoI } from '../../../models/Empleo.Interface';
import { FormControl, FormGroup } from '@angular/forms';
import { OfertaI } from '../../../models/Oferta.Interface';
import { AlertI } from '../../../models/complements/AlertI';
import { AlertService } from '../../../services/alert.service';
import { OfertaService } from '../../../services/oferta.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-contratar-modal',
  templateUrl: './contratar-modal.component.html',
  styleUrls: ['./contratar-modal.component.scss'],
})
export class ContratarModalComponent implements OnInit {
  private propuesta:EmpleoI;
  private oferta:OfertaI;
  
  ofertaForm = new FormGroup({
    precioPorHora:  new FormControl(''),
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    horaInicio: new FormControl(''),
    horaFin: new FormControl(''),
    complemento: new FormControl(''),
});

  constructor(
    private navParams: NavParams,
    private modal: ModalController,
    private ws: OfertaService, 
    private alertService:AlertService,
    private auth:AuthService) { 
    
    this.propuesta = navParams.get('propuesta');
    console.log(this.propuesta);
  }

  ngOnInit() {}
  closeModal(){
    this.modal.dismiss();
  }

  guardarOferta(form:OfertaI){
    this.oferta = form;
    console.log(this.oferta);

    let user:any = this.auth.getUser();
    let idUserCache:string = user.usuario.idUsuario;

     let ofer:string = `{"propuesta":{"idPropuesta":`+this.propuesta.idPropuesta +`},"usuario": {"idUsuario":`+ idUserCache +`} ,"precioPorHora":` + form.precioPorHora + `,"fechaInicio":"` + form.fechaInicio + `","fechaFin":"` + form.fechaFin + `","horaInicio":"` + form.horaInicio + `","horaFin":"` + form.horaFin + `","complemento":"` + form.complemento + `","estado":1}`;
      
      let ofertaOb:OfertaI;
      ofertaOb = JSON.parse(ofer);
      console.log(ofertaOb);
    this.ws.postOferta(ofertaOb).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
        this.alertService.presentAlertMultipleButtons("Oferta Enviada", alerta.mensaje, "");
        console.log("Propuesta publicada...");
        this.ofertaForm.reset();
      }else{
       this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });
  }
}
