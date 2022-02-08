import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PublicarOfertaPage } from './publicar-oferta.page';

const routes: Routes = [
  {
    path: '',
    component: PublicarOfertaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PublicarOfertaPage]
})
export class PublicarOfertaPageModule {}
