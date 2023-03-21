import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [Storage],
})
export class Tab1Page implements OnInit {
  result: string | undefined;
  username: any;
  groupid: any;
  userid: any;
  groupcardadmin: any;
  groupcarduser: any;
  count_absen: any;
  absenId: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    public router: Router,
    private storage: Storage,
    private api: ApiService,
    public http: HttpClient
  ) {
    let username = localStorage.getItem('username');
    let userid = localStorage.getItem('userId');
    let groupid = localStorage.getItem('groupId');
    let token = localStorage.getItem('token');

    this.username = username?.replace(/"/g, '');
    this.groupid = groupid?.replace(/"/g, '');
    this.userid = userid?.replace(/"/g, '');
    //console.log(this.userid);

    if (this.groupid == '0') {
      this.groupid = 'Admin';
      this.groupcardadmin = true;
      this.groupcarduser = false;
    } else {
      this.groupid = 'User';
      this.groupcardadmin = false;
      this.groupcarduser = true;
    }
  }

  async ngOnInit() {
    const count_absen = await this.api.get('countabsen');
    this.count_absen = count_absen.message;
    //console.log(count_absen);

    const formData = new FormData();
    formData.append('user_id', this.userid);
    const absenId = await this.api.post('dataabsens', formData);
    this.absenId = absenId.message;
    //console.log(absenId);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Konfirmasi Log Out',
      mode: 'ios',
      subHeader: 'Apakah Anda yakin Ingin Logout?',
      buttons: [
        {
          text: 'LogOut',
          role: 'destructive',
          handler: () => {
            this.navigatelogout();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }
  navigatelogout() {
    //localStorage.removeItem('token'); -> item by item
    localStorage.clear(); // sekali semua kehapus
    this.router.navigate(['login'], { replaceUrl: true });
  }

  add() {
    this.router.navigate(['register'], { replaceUrl: true });
  }
  dataabsen() {
    this.router.navigate(['absen'], { replaceUrl: true });
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

    return nameday + ', ' + day + ' ' + month + ' ' + year;
  }
  replace(s: string) {
    return s && s.replace(/"/g, '') && s.replace(/;/g, '<br>');
  }

  rfid() {
    this.router.navigate(['rfid'], { replaceUrl: true });
  }
  finger() {}
}
