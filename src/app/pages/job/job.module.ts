import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
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
