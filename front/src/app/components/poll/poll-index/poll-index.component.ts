import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/_services/poll.service';
import { Poll } from '../../../_models/poll.model';
import { User } from '../../../_models/user.model';
import { GapService } from 'src/app/_services/gap.service';
import { AssignationService } from 'src/app/_services/assignation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-index',
  templateUrl: './poll-index.component.html',
  styleUrls: ['./poll-index.component.scss']
})
export class PollIndexComponent implements OnInit {
  polls: Poll[];
  currentUser: User;
  gapsOfPoll: Map<number, number>;
   participatedPollsId: number[];

  constructor(private pollService: PollService, private gapService: GapService, private assignationService: AssignationService,
    private toastr: ToastrService, private router: Router) {
    this.gapsOfPoll = new Map();
    this.participatedPollsId = [];
    this.polls = [];
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.pollService.getAll().subscribe(
      data => {
        this.polls = data["response"];
        this.polls.forEach(poll => {
          this.gapService.getGapsOfPoll(poll["poll_id"]).subscribe(
            data => {
              data["response"].forEach(element => {
                this.gapsOfPoll.set(element["gap_id"], poll["poll_id"]);
              });
            },
            error => this.toastrError(error)
          );
        });

        this.assignationService.getGapsOfUser(this.currentUser["user_id"]).subscribe(
          data => {
            data["response"].forEach(element => {
              if (this.gapsOfPoll.has(element["gap_id"])) this.participatedPollsId.push(this.gapsOfPoll.get(element["gap_id"]));
            });
          },
          error => this.toastrError(error)
        );
      },
      error => this.toastrError(error)
    );
  }

  toastrError(error) {
    console.error(error);
    if (error.error.status == 401) {
      this.toastr.warning('You are not authorized for this site!', 'Authorization');
      this.router.navigate(["/login"]);
    } else {
      this.toastr.error('Query error, please try again later.', 'Error');
    }
  }
}
