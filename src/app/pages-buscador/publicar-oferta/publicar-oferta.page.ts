import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RecursosService } from '../../services/recursos.service';
import { TipoEmpleoI } from '../../models/complements/TipoEmpleoI';
import { OfertaI } from '../../models/Oferta.Interface';
import { AuthService } from '../../services/auth.service';
import { OfertaService } from '../../services/oferta.service';
import { AlertI } from '../../models/complements/AlertI';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-publicar-oferta',
  templateUrl: './publicar-oferta.page.html',
  styleUrls: ['./publicar-oferta.page.scss'],
})
export class PublicarOfertaPage implements OnInit {

  public tiposEmpleos: TipoEmpleoI[] = [];
  public oferta: OfertaI;
  public job: string;
  public departamentosMunicipios: any;
  datosGeneralesForm = new FormGroup({
    tipoEmpleo: new FormControl(''),
    disponibilidad: new FormControl(''),
    tiempo: new FormControl(''),
    diasLaborables: new FormControl(''),
    tipoPago: new FormControl(''),
    cantidadPago: new FormControl(''),
    descripcion: new FormControl(''),
    lugares: new FormControl(''),
  });

  constructor(
    private wsRecursos: RecursosService,
    private auth: AuthService,
    private ws: OfertaService,
    private alertService: AlertService,) { }

  ngOnInit() {
    this.departamentosMunicipios = this.wsRecursos.getAllLugares();
    this.job = 'crearOferta';
    this.wsRecursos.getAllTiposEmpleos().subscribe(data => {
      this.tiposEmpleos = data;
      console.log(this.tiposEmpleos);
    });
  }

  guardarDatosGenerales(form) {
    console.log(form);
    let user: any = this.auth.getUser();
    let idUserCache: string = user.usuario.idUsuario;

    var stringTipoEmpleo: string = form.tipoEmpleo;
    var arrayTipoEmpleo = stringTipoEmpleo.split(",");

    let complemento = arrayTipoEmpleo[1] + `|` + form.disponibilidad + `|` + form.tiempo + `|` + form.diasLaborables + `|` + form.tipoPago + `|` + form.cantidadPago;

    let ofer: string = `{"propuesta":{"idPropuesta":0},"usuario":{"idUsuario":` + idUserCache + `},"precioPorHora":` + form.cantidadPago + `,"fechaInicio":"","fechaFin":"","horaInicio":"","horaFin":"","complemento":"` + complemento + `","estado":1,"idTipoEmpleo":"` + arrayTipoEmpleo[0] + `","oferta":"` + form.descripcion + `", "lugares":"`+form.lugares+`"}`;
    let ofertaOb: OfertaI;
    ofertaOb = JSON.parse(ofer);
    console.log(ofertaOb);
    console.log(complemento);

    this.ws.postOfertaPublicar(ofertaOb).subscribe(data => {
      let alerta: AlertI = data;
      if (alerta.tipo == "success") {
        this.alertService.presentAlertMultipleButtons("Oferta Enviada, en la mensajeria encontraras tu publicacion y las propuestas que hayas recibido", alerta.mensaje, "");
        console.log("Propuesta publicada...");
        this.datosGeneralesForm.reset();
      } else {
        this.alertService.presentAlertMultipleButtons(alerta.tipo, alerta.mensaje, alerta.error);
      }
    });

  }

  public changeJob(jobSegment: string) {
    this.job = jobSegment;
    console.log(jobSegment);
  }

}
