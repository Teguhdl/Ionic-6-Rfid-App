import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [Storage],
})
export class Tab3Page {
  result: string | undefined;
  username: any;
  groupid: any;
  userid: any;
  token: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    public router: Router,
    private storage: Storage
  ) {
    let username = localStorage.getItem('username');
    let userid = localStorage.getItem('userId');
    let groupid = localStorage.getItem('groupId');

    this.username = username?.replace(/"/g, '');
    this.groupid = groupid?.replace(/"/g, '');
    this.userid = userid?.replace(/"/g, '');
    //console.log(username);
    if (this.groupid == '0') {
      this.groupid = 'Admin';
    } else {
      this.groupid = 'User';
    }
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Konfirmasi Log Out',
      // mode: 'ios',
      subHeader: 'Apakah Anda yakin Ingin Logout?',
      buttons: [
        {
          text: 'Log Out',
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
    sessionStorage.clear();
    localStorage.clear(); // sekali semua kehapus
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
