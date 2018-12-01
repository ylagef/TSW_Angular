import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  userEditForm: FormGroup;

  constructor() {
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
        ])
    });

    console.log(this.userEditForm);
  }

}
