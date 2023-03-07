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
  constructor(
    private actionSheetCtrl: ActionSheetController,
    public router: Router,
    private storage: Storage
  ) {}
  
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
  option = {
    slidesPerView: 1.0,
    centeredSlides: true,
    loop: false,
    //spaceBetween: 10,
    freeMode: true,
    // slidePerView: 3.5,
     slideOffsetBefore: 11,
    // spaceBetween: 10,
    // loop: false,
  };
}
