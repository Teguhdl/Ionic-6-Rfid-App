import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService } from '../service/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [Storage],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public decode: any;
  public errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public api: ApiService,
    private alertController: AlertController,
    public http: HttpClient,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  ngOnInit() {}

  async login() {
    const formData = new FormData();
    formData.append('username', this.loginForm.value.username);
    formData.append('password', this.loginForm.value.password);
    const response = await this.api.post(environment.auth, formData);
    // console.log(response);

    if (response.message == null) {
      const alert = await this.alertController.create({
        header: 'Alert',
        mode: 'ios',
        subHeader: 'Gagal Login',
        message: 'Username & Password Salah Silahkan Coba Lagi',
        buttons: ['OK'],
      });
      // this.router.navigate(['tabs'], { replaceUrl: true });

      await alert.present();
      this.router.navigate(['login'], { replaceUrl: true });
    } else {
      this.decode = jwtDecode(response.message);
      localStorage.setItem('token', JSON.stringify(response.message));
      localStorage.setItem('username', JSON.stringify(this.decode.usn));
      localStorage.setItem('groupId', JSON.stringify(this.decode.ugi));
      localStorage.setItem('userId', JSON.stringify(this.decode.uid));

      let username = localStorage.getItem('username');
      const alert = await this.alertController.create({
        header: 'Login',
        mode: 'ios',
        subHeader: 'Login Success',
        message: 'Selamat Datang ' + username,
        buttons: ['OK'],
      });

      await alert.present();
      this.router.navigate(['tabs'], { replaceUrl: true });
    }
  }
  async lupapassword() {
    const alert = await this.alertController.create({
      header: 'Alert',
      mode: 'ios',
      subHeader: 'Belom Tersedia',
      message: 'Untuk Saat Ini Belum Tersedia',
      buttons: ['OK'],
    });

    await alert.present();
    this.router.navigate(['login'], { replaceUrl: true });
  }
  async register() {
    const alert = await this.alertController.create({
      header: 'Alert',
      mode: 'ios',
      subHeader: 'Belom Tersedia',
      message: 'Untuk Saat Ini Belum Tersedia',
      buttons: ['OK'],
    });

    await alert.present();
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
