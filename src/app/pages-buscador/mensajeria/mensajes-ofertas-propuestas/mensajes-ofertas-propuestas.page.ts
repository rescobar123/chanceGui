import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaPropuestaService } from '../../../services/oferta-propuesta.service';
import { OfertaPropuestaI } from '../../../models/OfertaPropuesta';

@Component({
  selector: 'app-mensajes-ofertas-propuestas',
  templateUrl: './mensajes-ofertas-propuestas.page.html',
  styleUrls: ['./mensajes-ofertas-propuestas.page.scss'],
})
export class MensajesOfertasPropuestasPage implements OnInit {
  public idOferta:number;
  public ofertaPropuestas:OfertaPropuestaI[]=[];
  constructor(private rutaActiva:ActivatedRoute, private propOferService:OfertaPropuestaService) { }

  ngOnInit() {
    this.idOferta = parseInt (this.rutaActiva.snapshot.paramMap.get("idOferta"));
    this.propOferService.getAllPropuestasByOfer(this.idOferta).subscribe(data => {
      this.ofertaPropuestas = data;
      console.log(this.ofertaPropuestas);
    });
  }

}
