import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MensajesOfertasPropuestasPage } from './mensajes-ofertas-propuestas.page';
import { PublicComponent } from '../../../pages/profile/public/public.component';

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
  declarations: [
    MensajesOfertasPropuestasPage,
    PublicComponent,
  ], 
  exports: [
    PublicComponent
  ], 
  entryComponents:[
    PublicComponent
  ]

})
export class MensajesOfertasPropuestasPageModule {}
