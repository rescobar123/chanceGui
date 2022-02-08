import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { BuscarPage } from './buscar.page';
import { PropuestaModalComponent } from './propuesta-modal/propuesta-modal.component';
import { ContratarModalComponent } from './contratar-modal/contratar-modal.component';

const routes: Routes = [
  {
    path: '',
    component: BuscarPage
  },
  {
    path: 'modal',
    loadChildren: () => import('./propuesta-modal/propuesta-modal.component').then( m => m.PropuestaModalComponent)
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    BuscarPage,
    PropuestaModalComponent,
    ContratarModalComponent
  ],

  exports:[
    PropuestaModalComponent,
    ContratarModalComponent
  ],
  entryComponents: [
    PropuestaModalComponent,
    ContratarModalComponent
  ]
})
export class BuscarPageModule {}
