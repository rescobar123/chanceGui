import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaPropuestaService } from '../../../services/oferta-propuesta.service';
import { OfertaPropuestaI } from '../../../models/OfertaPropuesta';
import { ModalController } from '@ionic/angular';
import { PublicComponent } from '../../../pages/profile/public/public.component';

@Component({
  selector: 'app-mensajes-ofertas-propuestas',
  templateUrl: './mensajes-ofertas-propuestas.page.html',
  styleUrls: ['./mensajes-ofertas-propuestas.page.scss'],
})
export class MensajesOfertasPropuestasPage implements OnInit {
  public idOferta:number;
  public ofertaPropuestas:OfertaPropuestaI[]=[];
  constructor(private rutaActiva:ActivatedRoute, 
    private propOferService:OfertaPropuestaService,
    private modalController:ModalController) { }

  ngOnInit() {
    this.idOferta = parseInt (this.rutaActiva.snapshot.paramMap.get("idOferta"));
    this.propOferService.getAllPropuestasByOfer(this.idOferta).subscribe(data => {
      this.ofertaPropuestas = data;
      console.log(this.ofertaPropuestas);
    });
  }
  holamundo(){
    console.log("hola mundo")
  };

  async presentModalContract(idUsuario:number) {
    const modal = await this.modalController.create({
    component: PublicComponent,
    componentProps: {
      'idUsuario': idUsuario,
    }
    });
    return await modal.present();
  }
}
