import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user.model';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  error = '';

  constructor(private router: Router, private toastr: ToastrService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  logIn(username: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    this.authenticationService.login(username, password)
      .subscribe(
        data => {
          this.toastr.success('User is correct!');
          this.router.navigate(["/polls/index"]);
        },
        error => {
          console.log(error);
          this.toastr.error('User is not on Database.', 'ERROR', { progressBar: true });
        });
  }
}