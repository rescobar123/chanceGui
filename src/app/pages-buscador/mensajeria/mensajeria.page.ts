import { Component, OnInit } from '@angular/core';
import { OfertaI } from '../../models/Oferta.Interface';
import { AlertController } from '@ionic/angular';
import { OfertaService } from '../../services/oferta.service';
import { RecursosService } from '../../services/recursos.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {
  user = null;
  public ofertas: OfertaI[] = [];
  public ofertasPublic: OfertaI[] = [];
  public visto: boolean = true;
  public noVisto: boolean = false;
  public job: string = "mensajes2";
  constructor(
    private auth: AuthService,
    private ofertaService: OfertaService,
  ) {


  }
  ngOnInit() {
    this.ofertaService.getAllOfertasByIdUserCreoOferta().subscribe(data => {
      this.ofertas = data;
    });
    this.changeJob("mensaje2");
  }

  public changeJob(jobSegment: string) {
    this.job = jobSegment;
    console.log(jobSegment);
  }

}
