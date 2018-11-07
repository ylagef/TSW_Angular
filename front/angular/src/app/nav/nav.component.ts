import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  users: Object;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // Get all users from DB
    this.userService.getAll().subscribe(data => {
      this.users = data['response'];
    });
  }

}
