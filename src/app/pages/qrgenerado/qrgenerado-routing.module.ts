import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrgeneradoPage } from './qrgenerado.page';

const routes: Routes = [
  {
    path: '',
    component: QrgeneradoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrgeneradoPageRoutingModule {}
