import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'chance',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  { path: 'publicar-oferta', loadChildren: './pages-buscador/publicar-oferta/publicar-oferta.module#PublicarOfertaPageModule' },
  { path: 'mensajeria', loadChildren: './pages-buscador/mensajeria/mensajeria.module#MensajeriaPageModule' },
  { path: 'oferta-descripcion', loadChildren: './pages/job/oferta-descripcion/oferta-descripcion.module#OfertaDescripcionPageModule' },
  { path: 'mensajes-ofertas-propuestas', loadChildren: './pages-buscador/mensajeria/mensajes-ofertas-propuestas/mensajes-ofertas-propuestas.module#MensajesOfertasPropuestasPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
