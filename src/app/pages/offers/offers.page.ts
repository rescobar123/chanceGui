import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { OfertaService } from '../../services/oferta.service';
import { OfertaI } from '../../models/Oferta.Interface';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  user = null;
  public ofertas:OfertaI[]=[];
  public visto:boolean = true;
  public noVisto:boolean=false;
  constructor(
    private alertCtrl: AlertController,
    private ofertaService:OfertaService
    ) { }
  ngOnInit() {
    this.ofertaService.getAllOfertasByIdUser().subscribe(data=>{
      this.ofertas = data;
      
      console.log(this.ofertas);
    });
  }
}
