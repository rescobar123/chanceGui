import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChekOfferPage } from './chek-offer.page';

const routes: Routes = [
  {
    path: '',
    component: ChekOfferPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChekOfferPage]
})
export class ChekOfferPageModule {}
