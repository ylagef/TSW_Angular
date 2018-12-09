import { Component } from '@angular/core';
import { User } from './_models/user.model';
import { AuthenticationService } from './_services/authentication.service';
// import { NavComponent } from './nav/nav.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  local: User;

  constructor(public auth: AuthenticationService) {
    
  }

  ngOnInit() {
    this.auth.loggedUser.subscribe(
      (data: User) => this.local = data
    );

    this.auth.reLogin();
  }

  
}
