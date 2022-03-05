import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'chance',
    loadChildren: () => import('./milgen/milgen.module').then(m => m.MilgenPageModule),
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
