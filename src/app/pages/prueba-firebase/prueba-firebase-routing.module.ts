import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebaFirebasePage } from './prueba-firebase.page';

const routes: Routes = [
  {
    path: '',
    component: PruebaFirebasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebaFirebasePageRoutingModule {}
