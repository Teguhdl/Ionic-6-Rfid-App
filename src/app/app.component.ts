import { Component } from '@angular/core';

// @Injectable{(
//   provideIn : 'root'
// )}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username: any;
  groupid: any;
  userid: any;
  constructor() {}
}
