import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [Storage],
})
export class Tab1Page {
  result: string | undefined;
  username: any;
  groupid: any;
  userid: any;
  groupcardadmin: any;
  constructor(
    private actionSheetCtrl: ActionSheetController,
    public router: Router,
    private storage: Storage
  ) {
    let username = localStorage.getItem('username');
    let userid = localStorage.getItem('userId');
    let groupid = localStorage.getItem('groupId');
    let token = localStorage.getItem('token');

    this.username = username?.replace(/"/g, '');
    this.groupid = groupid?.replace(/"/g, '');
    this.userid = userid?.replace(/"/g, '');

    if (this.groupid == '0') {
      this.groupid = 'Admin';
      this.groupcardadmin = true;
    } else {
      this.groupid = 'User';
      this.groupcardadmin = false;
    }
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
}
