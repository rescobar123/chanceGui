import { Component, OnInit } from '@angular/core';
import { ComentarioService } from '../../../services/comentario.service';
import { ComentarioI } from '../../../models/Comentario.Interface';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

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
  messagesList: any[];
  constructor(
    private comentarioService:ComentarioService,
    private rutaActiva:ActivatedRoute
  ) { }

  ngOnInit() {
    let idOferta= this.rutaActiva.snapshot.paramMap.get("idOferta");
    let idPropuesta = this.rutaActiva.snapshot.paramMap.get("idPropuesta");
    this.comentarioService.getAllComentarios(idPropuesta,idOferta).subscribe(data=>{
      this.comentarios = data;
      
      console.log(this.comentarios);
    });
  }

  enviarComentario(form:ComentarioI){
    console.log("je")
    console.log(form.contenido);
  }



}
