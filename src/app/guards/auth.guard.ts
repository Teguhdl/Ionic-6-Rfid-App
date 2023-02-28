import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private token: any;
  constructor(public router: Router, public api: ApiService) {}
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Guard for user is login or not
    const user = await this.cekToken();
    if (!user || user === null) {
      this.router.navigate(['/login']);
    } else if (user) {
      if (!Object.keys(user).length) {
        this.router.navigate(['/login']);
      }
    }
    return true;
  }
  private async cekToken() {
    let user;
    if (!localStorage.getItem('token')) {
      this.api.newtoken.subscribe((value) => {
        this.token = value;
      });
      user = await this.token;
    } else {
      user = await localStorage.getItem('token');
    }
    return user;
  }
}
