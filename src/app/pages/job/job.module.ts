import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PublicatedJobComponent } from './publicated-job/publicated-job.component';
import { JobPage } from './job.page';
import { OfertasDisponiblesComponent } from './ofertas-disponibles/ofertas-disponibles.component';

const routes: Routes = [
  {
    path: '',
    component: JobPage
  },
  {
    path: 'publish-job/:empleo',
    loadChildren: () => import('./publish-job/publish-job.module').then(m => m.PublishJobPageModule),
  },
  {
    path: 'oferta-descripcion/:idOferta',
    loadChildren: () => import('./oferta-descripcion/oferta-descripcion.module').then(m => m.OfertaDescripcionPageModule),
  },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes), 
  ],
  exports:[
    PublicatedJobComponent,
    OfertasDisponiblesComponent
  ],
  declarations: [
    JobPage,
    OfertasDisponiblesComponent,
    PublicatedJobComponent,
  ],
})
export class JobPageModule {}
