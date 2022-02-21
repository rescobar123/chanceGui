import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { OfertaI } from '../../../models/Oferta.Interface';
import { AuthService } from '../../../services/auth.service';
import { AlertI } from '../../../models/complements/AlertI';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-oferta-publicated',
  templateUrl: './oferta-publicated.component.html',
  styleUrls: ['./oferta-publicated.component.scss'],
})
export class OfertaPublicatedComponent implements OnInit {
  public ofertas:OfertaI[]=[];
  public trabajo: String;
  public tipoPago: String;
  public contratacion: String;
  constructor(private wsOferta:OfertaService,
    private auth:AuthService,
    private alertService:AlertService) { }

  ngOnInit() {
    let user:any = this.auth.getUser();
    let idUserCache:string = user.usuario.idUsuario;
    this.wsOferta.getAllOfertaByIdUsuario(idUserCache).subscribe(data=>{
      this.ofertas = data;
      console.log(this.ofertas);
    });
  }

  arreglarInformacion(informacion: String) {
    var arregloInformacion = informacion.split("|");
    this.trabajo = arregloInformacion[0];
    this.contratacion = arregloInformacion[1];
    this.tipoPago = arregloInformacion[4]

  }

  deleteOferta(idOferta:any){
    let oferta = '{ "idOferta":' + idOferta +' }';
    let ofertaOb:OfertaI;
    ofertaOb = JSON.parse(oferta);
    this.wsOferta.deleteOferta(ofertaOb).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
        this.alertService.presentAlertMultipleButtons("Oferta eliminada", alerta.mensaje, "");
        console.log("Propuesta eliminada...");
        this.ngOnInit();
      }else{
       this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });
  }
  cambiarEstadoOferta(idOferta:any, estado:any){
    let oferta = '{ "idOferta":' + idOferta +', "estado": '+ estado +' }';
    let ofertaOb:OfertaI;
    ofertaOb = JSON.parse(oferta);
    this.wsOferta.actualizarOferta(ofertaOb).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
        this.alertService.presentAlertMultipleButtons("Oferta actualizada", alerta.mensaje, "");
        console.log("Oferta actualizada...");
        this.ngOnInit();
      }else{
       this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });
  }
}
