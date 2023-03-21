import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RfidPageRoutingModule } from './rfid-routing.module';

import { RfidPage } from './rfid.page';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RfidPageRoutingModule,
    NgxScannerQrcodeModule
  ],
  declarations: [RfidPage ,SafePipe]
})
export class RfidPageModule {}
