import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService } from '../service/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
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
  // loginForm = {
  //   username: '',
  //   password: '',
  // };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public api: ApiService,
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
    // this.authService
    //   .useLogin(this.loginForm.value.username, this.loginForm.value.password)
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
    const response = await this.api.post(environment.auth, formData);
    console.log(response);

    if (response.message == null) {
      alert('Ggal Lgin');
      //this.router.navigate(['login']);
    } else {
      this.decode = jwtDecode(response.message);
      localStorage.setItem('token', JSON.stringify(response.message));
      localStorage.setItem('username', JSON.stringify(this.decode.usn));
      localStorage.setItem('groupId', JSON.stringify(this.decode.ugi));
      localStorage.setItem('userId', JSON.stringify(this.decode.uid));
      alert('berhasil');
      this.router.navigate(['tabs'], { replaceUrl: true });
    }
    // this.authService
    //   .useLogin(this.loginForm.value.username, this.loginForm.value.password)
    //   .subscribe(
    //     (value) => {
    //       if (value) {
    //         console.log(value);
    //         alert('login success');
    //       } else {
    //         alert('Gagal login');
    //         console.log(value);
    //       }
    //     },
    //     (error) => {
    //       alert('gatau');
    //       console.log(false);
    //     }
    //   );
  }
}
