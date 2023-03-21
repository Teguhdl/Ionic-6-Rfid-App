import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgxScannerQrcodeComponent,
  NgxScannerQrcodeService,
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
@Component({
  selector: 'app-rfid',
  templateUrl: './rfid.page.html',
  styleUrls: ['./rfid.page.scss'],
})
export class RfidPage implements OnInit {
  data: any;
  public config: ScannerQRCodeConfig = {
    // fps: 100,
    // isBeep: false,
    // decode: 'macintosh',
    vibrate: 400,
    deviceActive: 1,
    constraints: {
      audio: false,
      video: {
        width: window.innerWidth,
      },
    },
  };
  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  @ViewChild('action') action: NgxScannerQrcodeComponent | undefined;

  constructor(private qrcode: NgxScannerQrcodeService, public router: Router) {}

  public onEvent(e: ScannerQRCodeResult[]): void {
    this.data = e;
    console.log(e);
  }
  public onError(e: any): void {
    alert(e);
  }

  ngOnInit() {}

  Register() {
    this.router.navigate(['register'], { replaceUrl: true });
  }

  datenow() {
    var days = new Array(7);
    days[0] = 'Minggu';
    days[1] = 'Senin';
    days[2] = 'Selasa';
    days[3] = 'Rabu';
    days[4] = 'Kamis';
    days[5] = 'Jumat';
    days[6] = 'Sabtu';
    var months = new Array(11);
    months[0] = 'Januari';
    months[1] = 'Februari';
    months[2] = 'Maret';
    months[3] = 'April';
    months[4] = 'Mei';
    months[5] = 'Juni';
    months[6] = 'Juli';
    months[7] = 'Agustus';
    months[8] = 'September';
    months[9] = 'Oktober';
    months[10] = 'November';
    months[11] = 'Desember';
    const today = new Date();
    const year = today.getFullYear();
    const month = months[today.getMonth()];
    const day = today.getDate().toString().padStart(2, '0');
    const nameday = days[today.getDay()];

    return nameday + ',' + day + ' ' + month + ' ' + year;
  }
  replace(s: string) {
    return s && s.replace(/"/g, '') && s.replace(/;/g, '<br>');
  }
}
