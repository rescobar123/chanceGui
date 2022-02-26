import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { OfertaI } from '../../../models/Oferta.Interface';
import { RecursosService } from '../../../services/recursos.service';
import { TipoEmpleoI } from '../../../models/complements/TipoEmpleoI';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ofertas-disponibles',
  templateUrl: './ofertas-disponibles.component.html',
  styleUrls: ['./ofertas-disponibles.component.scss'],
})
export class OfertasDisponiblesComponent implements OnInit {
  datosEmpleosForm = new FormGroup({
    empleos: new FormControl(''),
  });

  public ofertas: OfertaI[] = [];
  public trabajo: String;
  public tipoPago: String;
  public contratacion: any;
  public inf: number = 0;
  public empleos: string = "NO";
  public tiposEmpleos: TipoEmpleoI[] = [];
  public idUsuario:number;
  constructor(
    private ofertaService: OfertaService,
    private wsRecursos: RecursosService,
  ) {
    this.wsRecursos.getAllTiposEmpleos().subscribe(data => {
      this.tiposEmpleos = data;
      console.log(this.tiposEmpleos);
    });
  }

  ngOnInit() {
    this.ofertaService.getAllOfertasPublic(this.empleos).subscribe(data => {
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
  filtrarEmpleos(form) {
    this.empleos = form.empleos;
    this.ngOnInit();
    console.log(this.empleos);
  }
}
