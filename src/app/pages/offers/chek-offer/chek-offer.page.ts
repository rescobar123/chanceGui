import { Component, OnInit } from '@angular/core';
import { ComentarioService } from '../../../services/comentario.service';
import { ComentarioI } from '../../../models/Comentario.Interface';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertI } from '../../../models/complements/AlertI';

@Component({
  selector: 'app-chek-offer',
  templateUrl: './chek-offer.page.html',
  styleUrls: ['./chek-offer.page.scss'],
})
export class ChekOfferPage implements OnInit {
  comentarioForm = new FormGroup({
    contenido:  new FormControl(''),
});
  public messages;
  public comentarios:ComentarioI[]=[];
  public idPropuesta:any;
  public idOferta:any;
  messagesList: any[];
  constructor(
    private comentarioService:ComentarioService,
    private rutaActiva:ActivatedRoute
  ) { }

  ngOnInit() {
    this.idOferta= this.rutaActiva.snapshot.paramMap.get("idOferta");
    this.idPropuesta = this.rutaActiva.snapshot.paramMap.get("idPropuesta");
    this.comentarioService.getAllComentarios(this.idPropuesta,this.idOferta).subscribe(data=>{
      this.comentarios = data;
      
      console.log(this.comentarios);
    });
  }

  enviarComentario(form:ComentarioI){
    console.log("je")
    form.recibeEnvia = 1;
    form.estado = 2;
    form.propuesta.idPropuesta = this.idPropuesta;
    form.oferta.idOferta = this.idOferta;
    console.log(form.contenido);

    this.comentarioService.postComentario(form).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
        //this.alertService.presentAlertMultipleButtons("Propuesta publicada!!", alerta.mensaje, "");
        console.log("Propuesta publicada...");
        this.comentarioForm.reset();
        this.ngOnInit();
      }else{
       //this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });
  }



}
