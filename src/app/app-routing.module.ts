import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresadoGuard } from './guards/no-ingresado.guard';
import { IngresadoGuard } from './guards/ingresado.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'alert',
    loadChildren: () => import('./pages/alert/alert.module').then(m => m.AlertPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'qrgenerado',
    loadChildren: () => import('./pages/qrgenerado/qrgenerado.module').then(m => m.QrgeneradoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'registrodocente',
    loadChildren: () => import('./pages/registrodocente/registrodocente.module').then(m => m.RegistrodocentePageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then(m => m.InformacionPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'api',
    loadChildren: () => import('./pages/api/api.module').then( m => m.ApiPageModule),
    canActivate: [IngresadoGuard]    
  },  {
    path: 'prueba-firebase',
    loadChildren: () => import('./pages/prueba-firebase/prueba-firebase.module').then( m => m.PruebaFirebasePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
