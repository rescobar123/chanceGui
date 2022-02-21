import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfertaDescripcionPage } from './oferta-descripcion.page';

const routes: Routes = [
  {
    path: '',
    component: OfertaDescripcionPage
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
  declarations: [OfertaDescripcionPage]
})
export class OfertaDescripcionPageModule {}
