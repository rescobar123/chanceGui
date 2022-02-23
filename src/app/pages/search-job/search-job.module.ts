import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchJobPage } from './search-job.page';
import { OfertasDisponiblesComponent } from '../job/ofertas-disponibles/ofertas-disponibles.component';

const routes: Routes = [
  {
    path: '',
    component: SearchJobPage
  }, 
  {
    path: 'oferta-descripcion/:idOferta',
    loadChildren: () => import('../job/oferta-descripcion/oferta-descripcion.module').then(m => m.OfertaDescripcionPageModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchJobPage, OfertasDisponiblesComponent],
  exports: [
    OfertasDisponiblesComponent
  ]
})
export class SearchJobPageModule {}
