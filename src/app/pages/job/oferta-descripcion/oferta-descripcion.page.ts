import { Component, OnInit } from '@angular/core';
import { OfertaI } from '../../../models/Oferta.Interface';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { FormGroup, FormControl } from '@angular/forms';

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

  ofertaForm = new FormGroup({
    idOferta: new FormControl(''),
  });
  constructor( private rutaActiva:ActivatedRoute, 
    private wsOferta:OfertaService) { 

    let oferta =  this.rutaActiva.snapshot.paramMap.get("idOferta");
    this.wsOferta.getAllOfertaById(oferta).subscribe(data => {
      this.oferta = data;
      this.arreglarInformacion(this.oferta.complemento);
      console.log(this.oferta)
    });

    }

  ngOnInit() {
    
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

  aplicarOferta(){
    
  }

}
