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
  showPassword = false;
  public loginForm: FormGroup;
  public decode: any;
  public errorMessage: any;

  constructor(
    public api: ApiService,
    public http: HttpClient,
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  ngOnInit() {}

  async login() {
    const formData = new FormData();
    formData.append('username', this.loginForm.value.username);
    formData.append('password', this.loginForm.value.password);
    const response = await this.api.post(environment.auth, formData);
    // const response2 = await this.api.get(environment.device);
    //console.log(response2);

    if (response.message == null) {
      const alert = await this.alertController.create({
        header: 'Alert',
        cssClass: 'my-alert',
        subHeader: 'Gagal Login',
        message: 'Username & Password Salah Silahkan Coba Lagi',
        buttons: ['OK'],
      });
      this.router.navigate(['tabs'], { replaceUrl: true });

      await alert.present();
      // this.router.navigate(['login'], { replaceUrl: true });
    } else {
      this.decode = jwtDecode(response.message);
      localStorage.setItem('token', JSON.stringify(response.message));
      localStorage.setItem('username', JSON.stringify(this.decode.usn));
      localStorage.setItem('groupId', JSON.stringify(this.decode.ugi));
      localStorage.setItem('userId', JSON.stringify(this.decode.uid));

      let username = localStorage.getItem('username');
      const alert = await this.alertController.create({
        header: 'Login',
        subHeader: 'Login Success',
        message: 'Selamat Datang ' + username,
        buttons: ['OK'],
      });

      await alert.present();
      this.router.navigate(['tabs'], { replaceUrl: true });
    }
  }
}
