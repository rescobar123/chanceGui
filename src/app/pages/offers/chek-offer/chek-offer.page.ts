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
    recibeEnvia:  new FormControl(''),
    estado:  new FormControl(''),
    propuesta:  new FormControl(''),
    oferta:  new FormControl(''),

});
  public messages;
  public comentarios:ComentarioI[]=[];
  public idPropuesta:number;
  public idOferta:number;
  public recibeEnvia:number;
  messagesList: any[];
  constructor(
    private comentarioService:ComentarioService,
    private rutaActiva:ActivatedRoute
  ) { }

  ngOnInit() {
    this.idOferta = parseInt (this.rutaActiva.snapshot.paramMap.get("idOferta"));
    this.idPropuesta = parseInt (this.rutaActiva.snapshot.paramMap.get("idPropuesta"));
    this.recibeEnvia = parseInt (this.rutaActiva.snapshot.paramMap.get("recibeEnvia"));
    this.comentarioService.getAllComentarios(this.idPropuesta,this.idOferta).subscribe(data=>{
      this.comentarios = data;
      
      console.log(this.comentarios);
    });
  }

  enviarComentario(form:ComentarioI){
    console.log("je")
    form.recibeEnvia = this.recibeEnvia;
    form.estado = 1;
    form.propuesta = JSON.parse('{"idPropuesta": '+this.idPropuesta+' }')
    form.oferta = JSON.parse('{"idOferta": '+this.idOferta+' }');
   

    this.comentarioService.postComentario(form).subscribe( data => {
      let alerta:AlertI = data;
      if(alerta.tipo == "success"){
        //this.alertService.presentAlertMultipleButtons("Propuesta publicada!!", alerta.mensaje, "");
        console.log("comentario publicada...");
        this.comentarioForm.reset();
        this.ngOnInit();
      }else{
       //this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });
  }



}
