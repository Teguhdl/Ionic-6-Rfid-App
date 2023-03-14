import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [Storage],
})
export class Tab2Page implements OnInit {
  result: string | undefined;
  username: any;
  groupid: any;
  userid: any;
  device: any = [];
  data_device: any;
  data_perusahaan: any;
  perusahaandevice: any = [];
  data: any[] = [];
  perusahaans: string[] = [];
  devices: any[] = [];
  data_device2: any;
  data_perusahaan2: any;
  combine: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    public router: Router,
    private storage: Storage,
    public http: HttpClient,
    private apiService: ApiService
  ) {
    let username = localStorage.getItem('username');
    let userid = localStorage.getItem('userId');
    let groupid = localStorage.getItem('groupId');

    this.username = username?.replace(/"/g, '');
    this.groupid = groupid?.replace(/"/g, '');
    this.userid = userid?.replace(/"/g, '');
  }
  async ngOnInit() {
    // const data_device = await this.apiService.get('device');
    // this.data_device = data_device.message;

    // const data_perusahaan = await this.apiService.get('perusahaan');
    // this.data_perusahaan = data_perusahaan.message;
    // console.log(this.data_device);
    // console.log(this.data_perusahaan);

    var device = await this.apiService.get('device');
    const data_device2: {
      device_id: number;
      perusahaan_id: number;
      serial_number: number;
    }[] = device.message;
    this.data_device2 = data_device2;

    var perusahaan = await this.apiService.get('perusahaan');
    const data_perusahaan2: {
      perusahaan_id: number;
      nama_perusahaan: string;
    }[] = perusahaan.message;
    this.data_perusahaan2 = data_perusahaan2;

    console.log(data_device2);
    console.log(data_perusahaan2);

    const combinedData: { [key: string]: number[] } = {};
    data_perusahaan2.forEach(
      (perusahaan: { perusahaan_id: number; nama_perusahaan: string }) => {
        combinedData[perusahaan.nama_perusahaan] = [];
        data_device2.forEach(
          (device: {
            device_id: any;
            perusahaan_id: any;
            serial_number: number;
          }) => {
            if (device.perusahaan_id === perusahaan.perusahaan_id) {
              combinedData[perusahaan.nama_perusahaan].push(
                device.device_id,
                device.serial_number
              );
            }
          }
        );
      }
    );
    this.combine = combinedData;
    console.log(this.combine);
  }
}
