import { Component, OnInit } from '@angular/core';
import { OfertaI } from '../../models/Oferta.Interface';
import { AlertController } from '@ionic/angular';
import { OfertaService } from '../../services/oferta.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {
  user = null;
  public ofertas:OfertaI[]=[];
  public visto:boolean = true;
  public noVisto:boolean=false;
  constructor(
    private alertCtrl: AlertController,
    private ofertaService:OfertaService
    ) { }
  ngOnInit() {
    this.ofertaService.getAllOfertasByIdUserCreoOferta().subscribe(data=>{
      this.ofertas = data;
      console.log("Ofertas. " + this.ofertas);
    });
  }
}
