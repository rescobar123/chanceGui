import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MensajeriaPage } from './mensajeria.page';
import { OfertaPublicatedComponent } from '../publicar-oferta/oferta-publicated/oferta-publicated.component';

const routes: Routes = [
  {
    path: '',
    component: MensajeriaPage
  },
  {
    path: 'chek-offer/:idOferta/:idPropuesta/:recibeEnvia',
    loadChildren: () => import('../../pages/offers/chek-offer/chek-offer.module').then(m => m.ChekOfferPageModule),
  },
  {
    path: 'mensajes-ofertas-public/:idOferta',
    loadChildren: () => import('../mensajeria/mensajes-ofertas-propuestas/mensajes-ofertas-propuestas.module').then(m => m.MensajesOfertasPropuestasPageModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MensajeriaPage, 
    OfertaPublicatedComponent],
  exports:[
    
  ]
})
export class MensajeriaPageModule {}
