import { Component } from '@angular/core';
import { UserService } from './user/user.service';
// import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userLogged
  setUserLoggedIn() {
    this.userLogged = true;
  }

}
