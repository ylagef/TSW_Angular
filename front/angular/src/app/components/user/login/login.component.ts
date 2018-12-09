import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../_models/user.model';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../app.component';
import { AuthenticationService } from '../../../_services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  loading: boolean = false;
  submitted: boolean = false;
  error: string = '';
  returnUrl: string;

  constructor(private router: Router, private toastr: ToastrService, private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {
    this.authenticationService.logout();

    this.route.queryParams.subscribe(
      data => {
        if (data["returnUrl"] == undefined && this.returnUrl == undefined) {
          this.returnUrl = '/polls';
        } else if (data["returnUrl"] != undefined) {
          this.toastr.warning('You must be logged for this action.', 'Authentication', {
            positionClass: 'toast-top-center'
          });
          
          this.returnUrl = data["returnUrl"];
        }
      }
    );
  }

  ngOnInit() {
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