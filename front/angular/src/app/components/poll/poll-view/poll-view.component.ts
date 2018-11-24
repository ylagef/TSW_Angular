import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from 'src/app/_services/poll.service';
import { Poll } from '../../../_models/poll.model';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';
import { GapService } from 'src/app/_services/gap.service';
import { Gap } from 'src/app/_models/gap.model';
import { Assignation } from 'src/app/_models/assignation.model';
import { AssignationService } from 'src/app/_services/assignation.service';

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss']
})
export class PollViewComponent implements OnInit {
  private id: number;
  private poll: Poll;
  private hasPlace: any = false;
  private users: User[];
  private gaps: Gap[];
  private assignations: Assignation[];
  private assignationsMap: Map<number, number[]>;
  private gapsMap: Map<number, Gap[]>;

  constructor(private route: ActivatedRoute, private pollService: PollService, private userService: UserService,
    private gapsService: GapService, private assignationsService: AssignationService) {
    this.poll = new Poll();
    this.users = [];
    this.gaps = [];
    this.assignations = [];
    this.assignationsMap = new Map<number, number[]>();
    this.gapsMap = new Map<number, Gap[]>();
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.pollService.getById(this.id).subscribe(
          data => {
            this.poll = new Poll(data["response"][0].poll_id, data["response"][0].title, data["response"][0].place
              , data["response"][0].author, data["response"][0].url);

            if (this.poll.getPlace() != null) {
              this.hasPlace = true;
            }
          },
          error => console.log(error)
        )
      }
    );

    this.gapsService.getAll().subscribe(
      (data) => {
        this.gaps = data["response"];
        this.gaps.forEach(gap => {
          if (this.gapsMap.get(gap["gap_id"])) {
            // If key already exists
            let gaps: Gap[] = this.gapsMap.get(gap["gap_id"]);
            gaps.push(gap);
          } else {
            let gaps: Gap[] = [];
            gaps.push(gap);
            this.gapsMap.set(gap["gap_id"], gaps);
          }

        });
        console.log(this.gapsMap);
      }
    );

    this.assignationsService.getAll().subscribe(
      (data) => {
        this.assignations = data["response"];

        this.assignations.forEach(assignation => {
          if (this.assignationsMap.get(assignation["user_id"])) {
            // If key already exists
            let gaps: number[] = this.assignationsMap.get(assignation["user_id"]);
            gaps.push(assignation["gap_id"]);
          } else {
            let gaps: number[] = [];
            gaps.push(assignation["gap_id"]);
            this.assignationsMap.set(assignation["user_id"], gaps);
          }

        });

        this.userService.getAll().subscribe(
          (data) => {
            const allUsers = data["response"];
            console.log(this.assignationsMap);
            allUsers.forEach(user => {
              if (this.assignationsMap.get(user["user_id"]) != null) {
                this.users.push(user);
              }
            });
            console.log(this.users);
          }
        );
      }
    );
  }

}
