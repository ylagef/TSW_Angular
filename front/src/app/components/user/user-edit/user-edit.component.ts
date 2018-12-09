import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  userEditForm: FormGroup;

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.userEditForm = new FormGroup({
      username: new FormControl(this.user["username"],
        [
          Validators.required
        ]),
      name: new FormControl(this.user["name"],
        [
          Validators.required
        ]),
      email: new FormControl(this.user["email"],
        [
          Validators.required
        ]),
      user_id: new FormControl(this.user["user_id"])
    });
  }

  onSubmit() {
    this.user.email = this.userEditForm.value["email"];
    this.user.name = this.userEditForm.value["name"];
    this.user.username = this.userEditForm.value["username"];

    this.userService.edit(this.userEditForm.value).subscribe(
      () => {
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.toastr.success('User edited ok!');
        this.router.navigate(['/polls']);
      },
      error => {
        console.error(error);

        if (error.error.status == 401) {
          this.toastr.warning('You are not authorized for this site!', 'Authorization');
          this.router.navigate(["/login"]);
        } else {
          if (error.error.response == null) {
            this.toastr.error('Error on poll edit. Please try again.');
          } else {
            this.toastr.error(error.error.response + '. Please try again.');
          }
        }
      }
    );
  }

}
