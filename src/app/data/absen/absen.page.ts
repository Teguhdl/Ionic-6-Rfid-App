import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-absen',
  templateUrl: './absen.page.html',
  styleUrls: ['./absen.page.scss'],
  providers: [Storage],
})
export class AbsenPage implements OnInit {
  data_absen: any;
  constructor(
    private actionSheetCtrl: ActionSheetController,
    public router: Router,
    private storage: Storage,
    private api: ApiService,
    public http: HttpClient
  ) {}

  async ngOnInit() {
    const data_absen = await this.api.get('dataabsen');
    this.data_absen = data_absen.message;
    //console.log(data_absen);
  }
}
