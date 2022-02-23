import { Component, OnInit } from '@angular/core';
import { OfertaI } from '../../../models/Oferta.Interface';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ComentarioI } from '../../../models/Comentario.Interface';
import { ComentarioService } from '../../../services/comentario.service';
import { AlertI } from '../../../models/complements/AlertI';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { UsuarioI } from '../../../models/Usuario.Interface';
import { EmpleoI } from '../../../models/Empleo.Interface';
import { PropuestaService } from '../../../services/propuesta.service';

@Component({
  selector: 'app-oferta-descripcion',
  templateUrl: './oferta-descripcion.page.html',
  styleUrls: ['./oferta-descripcion.page.scss'],
})
export class OfertaDescripcionPage implements OnInit {
  public trabajo: string;
  public tipoPago: string;
  public contratacion: string;
  public oferta:OfertaI;
  public dias:string;
  public tiempo: string;
  public precioHora: string;
  public ofertaEspecifica: string;
  public fechaCreacion: string;
  public user:any;
  comentarioForm = new FormGroup({
    contenido:  new FormControl(''),
    recibeEnvia:  new FormControl(''),
    estado:  new FormControl(''),
    propuesta:  new FormControl(''),
    oferta:  new FormControl(''),

});
  constructor( 
    private rutaActiva:ActivatedRoute, 
    private wsOferta:OfertaService,
    private wsComentario:ComentarioService,
    private alertService:AlertService,
    private auth:AuthService,
    private propuestaService:PropuestaService) { 
    
    let oferta =  this.rutaActiva.snapshot.paramMap.get("idOferta");
    this.wsOferta.getAllOfertaById(oferta).subscribe(data => {
      this.oferta = data;
      this.arreglarInformacion(this.oferta.complemento);
      console.log(this.oferta)
    });

    }

  ngOnInit() {
    //Obtiene el usuario del wtoken;
    this.user = this.auth.getUser();
    console.log("User ** " , this.user.usuario.idUsuario);
  }

  arreglarInformacion(informacion: String) {
    var arregloInformacion = informacion.split("|");
    this.trabajo = arregloInformacion[0];
    this.contratacion = arregloInformacion[1];
    this.tiempo = arregloInformacion[2];
    this.dias = arregloInformacion[3];
    this.tipoPago = arregloInformacion[4];
    this.precioHora = arregloInformacion[5];
    this.ofertaEspecifica = this.oferta.oferta;
    this.fechaCreacion = this.oferta.fechaCreacion;

  }

  aplicarOferta(form:ComentarioI){
    form.recibeEnvia = 1;//1 porque es el empleado quien envia la oferta.
    form.estado = 1;
    form.propuesta = JSON.parse('{"idPropuesta": 0 }')
    form.oferta = JSON.parse('{"idOferta": '+this.oferta.idOferta+' }');
    form.contenido = "Ha aplicado a tu oferta, puedes ver su perfil";
    console.log(form);
    this.wsComentario.postComentario(form).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
        let propuesta:string = '{ "certificado": "", "descripcion": "He aplicado a tu oferta...", "diasLaborables": "", "disponibilidad" : "", "idTipoPropuesta": "0", "lugaresLaborables": "", "precioPorHora": "0", "usuarioCreo": {"idUsuario": '+this.user.usuario.idUsuario+' } }';
        let propuestaOb:EmpleoI;
        propuestaOb = JSON.parse(propuesta);
        this.crearPropuesta(propuestaOb);
        this.alertService.presentAlertMultipleButtons("Aplicado Correctamente, Favor no aplicar de nuevo, lo estaran contactando si es aceptado!!", alerta.mensaje, "");
        console.log("comentario publicada...");
        this.ngOnInit();
      }else{
       this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });


  }

  crearPropuesta(propuestaOb:EmpleoI){
    this.propuestaService.postPropuesta(propuestaOb).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
      //  this.alertService.presentAlertMultipleButtons("Propuesta publicada!!", alerta.mensaje, "");
        console.log("Propuesta publicada...");
      }else{
      // this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });
  }
}
