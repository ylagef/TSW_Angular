import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from 'src/app/_services/poll.service';
import { Poll } from '../../../_models/poll.model';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';
import { GapService } from 'src/app/_services/gap.service';
import { Gap } from 'src/app/_models/gap.model';
import { Assignation } from 'src/app/_models/assignation.model';
import { AssignationService } from 'src/app/_services/assignation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss']
})
export class PollViewComponent implements OnInit {
  url: string;
  poll: Poll;
  users: User[];
  gaps: Gap[];
  assignations: Assignation[];
  assignationsMap: Map<number, number[]>;
  gapsMap: Map<number, any>;
  currentUser: User;
  hasParticipated: boolean;
  maxParticipants: number;
  host: string;

  constructor(private route: ActivatedRoute, private pollService: PollService, private userService: UserService,
    private gapsService: GapService, private assignationsService: AssignationService, private toastr: ToastrService,
    private router: Router) {
    this.poll = new Poll();
    this.users = [];
    this.gaps = [];
    this.assignations = [];
    this.assignationsMap = new Map<number, number[]>();
    this.gapsMap = new Map<number, Gap[]>();
    this.hasParticipated = false;
    this.maxParticipants = 0;
    this.host = window.location.host;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.route.params.subscribe(
      (params) => {
        this.url = params['url'];

        this.pollService.getByUrl(this.url).subscribe(
          (data) => {
            this.poll = new Poll(data["response"][0].poll_id, data["response"][0].title,
              data["response"][0].place, data["response"][0].author, data["response"][0].url);

            this.gapsService.getGapsOfPoll(this.poll["poll_id"]).subscribe(
              (data) => {
                this.gaps = data["response"];

                this.gaps.forEach(gap => {
                  if (gap["poll_id"] == this.poll["poll_id"]) {
                    // If gap is of this poll
                    if (this.gapsMap.get(gap["gap_id"])) {
                      // If key already exists
                      let gaps: Gap[] = this.gapsMap.get(gap["gap_id"]);
                      gaps.push(gap);
                    } else {
                      let gaps: Gap[] = [];
                      gaps.push(gap);
                      this.gapsMap.set(gap["gap_id"], gaps);
                    }

                    // Set gap count to 0
                    this.gapsMap.get(gap["gap_id"])[1] = 0;
                  }
                });

                this.assignationsService.getAll().subscribe(
                  (data) => {
                    this.assignations = data["response"];

                    this.assignations.forEach(assignation => {
                      if (this.gapsMap.get(assignation["gap_id"]) != null) {
                        // If assigntation gap is on this poll gap map
                        if (this.assignationsMap.get(assignation["user_id"])) {
                          // If key already exists
                          let gaps: number[] = this.assignationsMap.get(assignation["user_id"]);
                          gaps.push(assignation["gap_id"]);
                        } else {
                          let gaps: number[] = [];
                          gaps.push(assignation["gap_id"]);
                          this.assignationsMap.set(assignation["user_id"], gaps);

                          if (assignation["user_id"] == this.currentUser["user_id"]) {
                            this.hasParticipated = true;
                          }
                        }

                        // Set gap assignations count
                        this.gapsMap.get(assignation["gap_id"])[1]++;

                        if (this.maxParticipants < this.gapsMap.get(assignation["gap_id"])[1]) {
                          this.maxParticipants = this.gapsMap.get(assignation["gap_id"])[1];
                        }
                      }
                    }
                    );

                    this.userService.getAll().subscribe(
                      (data) => {
                        const allUsers = data["response"];
                        allUsers.forEach(user => {
                          if (this.assignationsMap.get(user["user_id"]) != null) {
                            this.users.push(user);
                          }
                        });
                      },
                      (error) => this.toastrError(error)
                    );
                  },
                  (error) => this.toastrError(error)
                );
              },
              (error) => this.toastrError(error)
            );
          },
          (error) => this.toastrError(error)
        );
      }
    );
  }

  copy() {
    const val = "http://" + this.host + "/polls/view/" + this.poll["url"];
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
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
