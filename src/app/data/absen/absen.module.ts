import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbsenPageRoutingModule } from './absen-routing.module';

import { AbsenPage } from './absen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbsenPageRoutingModule
  ],
  declarations: [AbsenPage]
})
export class AbsenPageModule {}
