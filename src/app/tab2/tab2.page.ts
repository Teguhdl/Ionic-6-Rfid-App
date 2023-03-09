import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
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
  data: any;

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
  ngOnInit() {
    this.apiService.getData().subscribe((data) => {
      this.data = data;
      var data = this.data;
      sessionStorage.setItem('data_device', JSON.stringify(data.message));
      console.log(data.message[1]);
    });
  }
}
