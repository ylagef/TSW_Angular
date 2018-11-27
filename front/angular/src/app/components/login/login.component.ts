import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user.model';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../_services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  private loading = false;
  private submitted = false;
  private error = '';
  private returnUrl = "";

  constructor(private router: Router, private toastr: ToastrService, private route: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    this.loginForm = new FormGroup({
      username: new FormControl('',
        [
          Validators.required
        ]),
      password: new FormControl('',
        [
          Validators.required
        ])
    }
    );

    if (this.route.snapshot.queryParams['returnUrl'] != undefined) {
      this.toastr.warning('You must be logged for this action.', 'Authentication', {
        positionClass: 'toast-top-center'
      });
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/polls';
  }

  onSubmit() {
    this.authenticationService.login(this.loginForm.value["username"], this.loginForm.value["password"]).subscribe(
      () => {
        this.toastr.success('User is correct!');
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
        this.toastr.error('User is not on Database.', 'ERROR', { progressBar: true });
      }
    );
  }
}