import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidation } from './passwordValidation.directive'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      username: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4)
        ]),
      name: new FormControl('',
        [
          Validators.required
        ]),
      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5)
        ]),
      password_confirm: new FormControl('',
        [
          Validators.required
        ])
    },
      {
        validators: passwordValidation
      }
    );
  }

  onSubmit() {
    this.userService.register(this.registrationForm.value).subscribe(
      (response) => {
        this.toastr.success('User created correctly!');
        this.router.navigate(["/"]);
      },
      (error) => {
        console.log(error);
        this.toastr.error('User could not be created. Please try again.');
      }
    );
  }

}
