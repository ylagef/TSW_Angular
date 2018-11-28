import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/_services/poll.service';
import { Poll } from '../../../_models/poll.model';
import { User } from '../../../_models/user.model';
import { GapService } from 'src/app/_services/gap.service';
import { AssignationService } from 'src/app/_services/assignation.service';

@Component({
  selector: 'app-poll-index',
  templateUrl: './poll-index.component.html',
  styleUrls: ['./poll-index.component.scss']
})
export class PollIndexComponent implements OnInit {
  private polls: Poll[];
  private currentUser: User;
  private gapsOfPoll: Map<number, number>;
  private participatedPollsId: number[];

  constructor(private pollService: PollService, private gapService: GapService, private assignationService: AssignationService) {
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

              // console.log(this.gapsOfPoll);
            }
          );
        });

        this.assignationService.getGapsOfUser(this.currentUser["user_id"]).subscribe(
          data => {
            data["response"].forEach(element => {
              // console.log(element["gap_id"]);
              if (this.gapsOfPoll.has(element["gap_id"])) {
                // console.log(this.gapsOfPoll.get(element["gap_id"]));
                this.participatedPollsId.push(this.gapsOfPoll.get(element["gap_id"]));
              }
              // console.log(this.gapsOfPoll.has(element["gap_id"]));
            });
            console.log(this.participatedPollsId);
          }
        );
      },
      error => console.log(error)
    );
  }
}
