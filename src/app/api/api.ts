import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Api {
  public hostname;
  constructor(public http: HttpClient, public router: Router) {
    this.hostname = 'http://localhost/rfid-api/index.php/';
  }

 post(url:string, postData:any){
  this.http.post(this.hostname+url, postData)
      .subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });
  }
 }


