import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/chance/job',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'job',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/job/job.module').then(m => m.JobPageModule)
          }
        ]
      },
      {
        path: 'offers',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/offers/offers.module').then(m => m.OffersPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'findPersons',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages-buscador/buscar/buscar.module').then(m => m.BuscarPageModule)
          }
        ]
      },
      {
        path: 'publiOfert',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages-buscador/buscar/buscar.module').then(m => m.BuscarPageModule)
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
