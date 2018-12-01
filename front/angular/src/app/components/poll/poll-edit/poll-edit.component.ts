import { Component } from '@angular/core';
import { Poll } from 'src/app/_models/poll.model';
import { User } from 'src/app/_models/user.model';
import { Gap } from 'src/app/_models/gap.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from 'src/app/_services/poll.service';
import { GapService } from 'src/app/_services/gap.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.scss']
})
export class PollEditComponent {
  url: string;
  poll: Poll;
  gaps: Gap[];
  currentUser: User;
  host: string;
  pollEditForm: FormGroup;
  lastIndex: number;
  today: string;
  newGapsId: number[];

  constructor(private route: ActivatedRoute, private pollService: PollService, private gapsService: GapService,
    private toastr: ToastrService, private router: Router) {
    this.newGapsId = [];
    this.today = formatDate(Date.now(), "yyyy-MM-dd", "en-US");
    this.poll = new Poll();
    this.gaps = [];
    this.host = window.location.host;
    this.pollEditForm = new FormGroup({
      title: new FormControl('',
        [
          Validators.required
        ]),
      place: new FormControl('')
    });

    this.lastIndex = 0;

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.route.params.subscribe(
      (params) => {
        this.url = params['url'];

        this.pollService.getByUrl(this.url).subscribe(
          (data) => {
            this.poll = new Poll(data["response"][0].poll_id, data["response"][0].title,
              data["response"][0].place, data["response"][0].author, data["response"][0].url);

            this.pollEditForm.controls["title"].setValue(this.poll["title"]);
            this.pollEditForm.controls["place"].setValue(this.poll["place"]);

            // console.log("Poll constructor:");
            // console.log(this.poll);
            // console.log("Current user:");
            // console.log(this.currentUser);

            if (+this.poll["author"] != this.currentUser["user_id"]) {
              this.toastr.warning('You are not authorized for this site!');
              this.router.navigate(["/polls"]);
            }

            // console.log("Poll:");
            // console.log(this.poll);

            this.gapsService.getGapsOfPoll(this.poll["poll_id"]).subscribe(
              (data) => {
                // this.gaps = data["response"];

                data["response"].forEach(gap => {
                  const g: Gap = new Gap(gap["gap_id"], gap["poll_id"], new Date(gap["start_date"]), new Date(gap["end_date"]));
                  g.dates = [new Date(gap["start_date"]), new Date(gap["end_date"])];

                  this.gaps.push(g);

                  // Add form controls for gaps
                  this.pollEditForm.addControl('gap-' + gap["gap_id"], new FormControl(''));
                  // this.pollEditForm.addControl('end' + gap["gap_id"], new FormControl(''));

                  // console.warn(gap);
                  // console.log(this.pollEditForm);

                  this.lastIndex++;
                });


                // console.log("Gaps: " + this.lastIndex);
                // console.log(this.gaps);
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

  addRow() {
    this.gaps.push(new Gap(++this.lastIndex, this.poll["poll_id"]));
    this.newGapsId.push(this.lastIndex);

    console.warn("Gap added!");
    console.log("Gaps:");
    console.log(this.gaps);

    this.pollEditForm.addControl('gap-' + this.lastIndex,
      new FormControl('',
        [
          Validators.required
        ])
    );

    console.log(this.pollEditForm);
  }

  deleteRow(gap: Gap) {
    const index = this.gaps.indexOf(gap);
    const indexNew = this.newGapsId.indexOf(gap["gap_id"]);

    console.log("Before delete..." + index)
    console.log(this.pollEditForm);

    this.pollEditForm.removeControl('gap-' + gap["gap_id"]);

    this.gaps.splice(index, 1);
    this.newGapsId.splice(indexNew, 1);

    console.warn("Gap deleted!");
    console.log("Gaps:");
    console.log(this.gaps);

    console.log(this.pollEditForm);
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

  onSubmit() {
    console.warn("Submitted");
    console.log("Form:");
    console.log(this.pollEditForm);
    console.log("Gaps:");
    console.log(this.gaps);
    console.log("New gaps:");
    console.log(this.newGapsId);

    // Set the title and place to new ones on Poll object
    this.poll["title"] = this.pollEditForm.value["title"];
    this.poll["place"] = this.pollEditForm.value["place"];

    const idsOnDb = [];

    // Edit poll data
    this.pollService.edit(this.poll).subscribe(
      () => {
        // If poll data edited correctly, we edit poll gaps
        this.gapsService.getGapsOfPoll(this.poll["poll_id"]).subscribe(
          data => {
            // Gaps that are actually on db
            const gapsOnDb = data["response"];
            console.log("On db:")
            console.log(gapsOnDb);
            gapsOnDb.forEach(element => {
              idsOnDb.push(element["gap_id"]);
              if (this.pollEditForm.value["gap-" + element["gap_id"]] != undefined) {
                // On db and on form -> Edit on db
                console.log("Has " + element["gap_id"]);
                this.gapsService.editGap(element).subscribe(
                  () => { },
                  error => this.toastrError(error)
                );
              } else {
                // On db and NOT on form -> Delete from db
                console.log("Does not has " + element["gap_id"]);
                this.gapsService.deleteGap(element["gap_id"]).subscribe(
                  () => { },
                  error => this.toastrError(error)
                );
              }
            });

            const addGaps: Gap[] = []
            this.newGapsId.forEach(id => {
              const newGap: Gap = new Gap(null, this.poll["poll_id"]);
              newGap.dates = [this.pollEditForm.value["gap-" + id][0], this.pollEditForm.value["gap-" + id][1]];

              addGaps.push(newGap);
            });

            // If gaps are in form and not on db -> Add gaps to db
            console.log(addGaps);
            console.log(addGaps.length);
            if (addGaps.length > 0) {
              this.gapsService.addGaps(addGaps).subscribe(
                () => {
                  this.toastr.success('Poll edited successful.');
                  this.router.navigate(["/polls/view/" + this.poll["url"]]);
                },
                error => this.toastrError(error)
              );
            } else {
              this.toastr.success('Poll edited successful.');
              this.router.navigate(["/polls/view/" + this.poll["url"]]);
            }
          }
        );
      },
      (error) => this.toastrError(error)
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
