import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/services/poll.service';
import { Poll } from 'src/app/models/poll.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-poll-index',
  templateUrl: './poll-index.component.html',
  styleUrls: ['./poll-index.component.scss']
})
export class PollIndexComponent implements OnInit {
  private polls: Poll[];
  private currentUser: User;

  constructor(private pollService: PollService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.pollService.getAll()
      .subscribe(
        data => {
          this.polls = data["response"];
        },
        error => console.log(error)
      );
  }

}
