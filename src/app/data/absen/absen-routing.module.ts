import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbsenPage } from './absen.page';

const routes: Routes = [
  {
    path: '',
    component: AbsenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbsenPageRoutingModule {}
