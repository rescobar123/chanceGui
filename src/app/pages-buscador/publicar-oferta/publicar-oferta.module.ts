import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PublicarOfertaPage } from './publicar-oferta.page';
import { OfertaPublicatedComponent } from './oferta-publicated/oferta-publicated.component';

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
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PublicarOfertaPage,
    //OfertaPublicatedComponent
  ],
  exports:[
    
  ]
})
export class PublicarOfertaPageModule {}
