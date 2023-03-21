import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RfidPage } from './rfid.page';

const routes: Routes = [
  {
    path: '',
    component: RfidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RfidPageRoutingModule {}
