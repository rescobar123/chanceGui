import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MensajeriaPage } from './mensajeria.page';

const routes: Routes = [
  {
    path: '',
    component: MensajeriaPage
  },
  {
    path: 'chek-offer/:idOferta/:idPropuesta',
    loadChildren: () => import('../../pages/offers/chek-offer/chek-offer.module').then(m => m.ChekOfferPageModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MensajeriaPage]
})
export class MensajeriaPageModule {}
