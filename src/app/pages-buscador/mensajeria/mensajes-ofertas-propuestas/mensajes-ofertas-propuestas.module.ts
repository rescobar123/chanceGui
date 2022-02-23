import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MensajesOfertasPropuestasPage } from './mensajes-ofertas-propuestas.page';

const routes: Routes = [
  {
    path: '',
    component: MensajesOfertasPropuestasPage
  },
  {
    path: 'chek-offer/:idOferta/:idPropuesta/:recibeEnvia',
    loadChildren: () => import('../../../pages/offers/chek-offer/chek-offer.module').then(m => m.ChekOfferPageModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MensajesOfertasPropuestasPage]
})
export class MensajesOfertasPropuestasPageModule {}
