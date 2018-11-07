import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  users: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    // Get all users from DB
    this.data.getAllUsers().subscribe(data => {
      this.users = data['response'];
    });
  }


}
