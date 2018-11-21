import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private userService: UserService,
    private toastr: ToastrService, private app: AppComponent) { }

  ngOnInit() {
  }

  logIn(username: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    // Calls service to login user to the api rest
    this.loginService.login(username, password).subscribe(
      res => {
        console.log(res);
        this.toastr.success('User is correct!');
        const user: User = new User(res["response"][0].user_id, res["response"][0].username, res["response"][0].name, res["response"][0].email);
        this.userService.setUserLoggedIn(user);
        this.app.setUserLoggedIn();
      },
      error => {
        this.toastr.error('User is not on Database.', 'ERROR', { progressBar: true });
        console.error(error);
      },
      () => this.navigate()
    );

  }

  navigate() {
    this.router.navigate(['/polls/index']);
  }
}