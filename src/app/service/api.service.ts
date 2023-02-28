import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, EMPTY } from 'rxjs';

let HeaderAuth = {
  headers: new HttpHeaders({
    publickey: environment.publicKey,
  }),
};
let HeaderRequest = {
  headers: new HttpHeaders({
    publickey: environment.publicKey,
    Authorization: JSON.parse(localStorage.getItem('token') || '{}'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public hostname;
  public mqtt;
  public fileName = '';
  public response: any;

  public token = new BehaviorSubject<any>({});
  newtoken = this.token.asObservable();

  constructor(
    public http: HttpClient,
    public platform: Platform,
    public router: Router
  ) {
    if (window.location.hostname === environment.domainProd) {
      this.hostname = environment.domainProd + environment.path;
      this.mqtt = environment.mqttServer;
    } else if (window.location.hostname === environment.domainDev) {
      this.hostname = environment.domainDev + environment.path;
      this.mqtt = environment.mqttServer;
    } else {
      this.hostname = environment.domainLoc + environment.path;
      this.mqtt = environment.mqttServer;
      //sadasda
    }
  }
  async post(url: string, formData: any) {
    if (url === environment.auth) {
      try {
        const i = await this.http
          .post<any>(this.hostname + url, formData, HeaderAuth)
          .pipe(map((response) => response))
          .toPromise();
        return this.checkResponse(i);
      } catch (err) {
        return this.errorResponse(err || {});
      }
    } else {
      try {
        const i = await this.http
          .post<any>(this.hostname + url, formData, HeaderRequest)
          .pipe(map((response) => this.checkResponse(response)))
          .toPromise();
        return this.checkResponse(i);
      } catch (err) {
        return err;
      }
    }
  }
  async put(url: string, formData: any) {
    try {
      const i = await this.http
        .put(this.hostname + url, formData, HeaderRequest)
        .pipe(map((response) => this.checkResponse(response)))
        .toPromise();
      return this.checkResponse(i);
    } catch (err) {
      return err;
    }
  }
  async postFile(url: string, file: File) {
    try {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      const upload = await this.http
        .post(this.hostname + url, formData, HeaderRequest)
        .pipe(map((response) => response))
        .toPromise();
      return this.checkResponse(upload);
    } catch (err) {
      return err;
    }
  }
  async get(url: string) {
    try {
      const i = await this.http
        .get<any>(this.hostname + url, HeaderRequest)
        .pipe(map((response) => response))
        .toPromise();
      return this.checkResponse(i);
    } catch (err) {
      return err;
    }
  }

  async getById(url: string, id: string) {
    try {
      const i = await this.http
        .get<any>(this.hostname + url + id, HeaderRequest)
        .pipe(map((response) => response))
        .toPromise();
      return this.checkResponse(i);
    } catch (err) {
      return err;
    }
  }

  async deleteById(url: string, id: string) {
    try {
      const i = await this.http
        .delete<any>(this.hostname + url + id, HeaderRequest)
        .pipe(map((response) => response))
        .toPromise();

      return this.checkResponse(i || {});
    } catch (err) {
      return this.errorResponse(err || {});
    }
  }
  checkResponse(response: any) {
    if (response.message === 'Token Expired.' && response.success === false) {
      this.signOut();
    } else {
      return response || {};
    }
  }
  errorResponse(response: any) {
    // console.log('asdads',response.status);
    return EMPTY || {};
  }
  public signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/auth').then(() => {
      window.location.reload();
    });
  }
}
