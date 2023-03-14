import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [Storage],
})
export class RegisterPage implements OnInit {
  data_perusahaan: any;
  public registerForm: FormGroup;

  constructor(
    public http: HttpClient,
    public api: ApiService,
    private actionSheetCtrl: ActionSheetController,
    public router: Router,
    private fb: FormBuilder,
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      nama: ['', [Validators.required, Validators.minLength(5)]],
      rfid: ['', [Validators.required]],
      perusahaan_id: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    const data_perusahaan = await this.api.get('perusahaan');
    this.data_perusahaan = data_perusahaan.message;
    console.log(this.data_perusahaan);
  }
  async register() {
    const formData = new FormData();
    formData.append('nama', this.registerForm.value.nama);
    formData.append('username', this.registerForm.value.password);
    formData.append('password', this.registerForm.value.password);
    formData.append('perusahaan_id', this.registerForm.value.perusahaan_id);
    formData.append('rfid', this.registerForm.value.rfid);

    const response = await this.api.post(environment.register, formData);
    console.log(response);

    if (response.message == null) {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Gagal',
        message: 'Username Sudah Dipakai,Silahkan Coba lagi',
        buttons: ['OK'],
      });
      //this.router.navigate(['tabs'], { replaceUrl: true });

      await alert.present();
      this.router.navigate(['register'], { replaceUrl: true });
    } else {
      const alert = await this.alertController.create({
        header: 'Success',
        subHeader: '',
        message: 'Register User Success ',
        buttons: ['OK'],
      });

      await alert.present();
      this.router.navigate(['tabs'], { replaceUrl: true });
    }
  }
}
