import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PublicatedJobComponent } from './publicated-job/publicated-job.component';
import { JobPage } from './job.page';

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
  {
    path: 'PublicatedJobComponent',
    loadChildren: () => import('./publicated-job/publicated-job.component').then(m => m.PublicatedJobComponent),
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
  ],
  declarations: [
    JobPage,
    PublicatedJobComponent,
  ],
})
export class JobPageModule {}
