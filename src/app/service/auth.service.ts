import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private readonly storage: Storage) {}
  useLogin(username: string, password: string) {
    const body = { username: username, password: password };

    console.log(body);
    return this.http.post('http://localhost/rfid-api/index.php/login', body);
    // if (username && password) {
    //   var jwttoken =
    //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxIiwidWdpIjoiMCIsInVzbiI6Ik5hYmF0aSIsInVheCI6MTY3NjY5MDEyMH0.SqCIPWF-GktZ7O2V7JiiUb4L1_CyYPq-Z8AMe05ovH4';

    //   return of(jwttoken).pipe(
    //     map((token) => {
    //       if (!token) {
    //         return false;
    //       }
    //       this.storage.create();
    //       this.storage.set('access_token', token);
    //       var decodedUser = this.jwtHelper.decodeToken(token);
    //       this.userInfo.next(decodedUser);
    //       console.log(decodedUser);
    //       return true;
    //     })
    //   );
    // }
    // return of(false);
  }
}
