import { Component, OnInit } from '@angular/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Gap } from 'src/app/_models/gap.model';
import { formatDate } from '@angular/common';
import { Poll } from 'src/app/_models/poll.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from 'src/app/_services/poll.service';
import { GapService } from 'src/app/_services/gap.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-gap-add',
  templateUrl: './gap-add.component.html',
  styleUrls: ['./gap-add.component.scss']
})
export class GapAddComponent implements OnInit {
  today: string;
  gapsAddForm: FormGroup;
  gaps: Gap[];
  lastIndex: number;
  poll: Poll;

  constructor(private route: ActivatedRoute, private pollService: PollService, private gapService: GapService,
    private toastr: ToastrService, private router: Router) {
    this.today = formatDate(Date.now(), "yyyy-MM-dd", "en-US");

    this.gaps = [];
    this.lastIndex = 0;
  }

  ngOnInit() {
    this.gapsAddForm = new FormGroup({});
    this.route.params.subscribe(
      (params) => {
        const url = params['url'];
        this.pollService.getByUrl(url).subscribe(
          (data) => {
            this.poll = data["response"][0];
            this.addRow();
          },
          (error) => {
            console.error(error);
            if (error.error.status == 401) {
              this.toastr.warning('You are not authorized for this site!', 'Authorization');
              this.router.navigate(["/login"]);
            } else {
              this.toastr.error('Query error, please try again later.', 'Error');
            }
          }
        );
      },
      (error) => {
        console.error(error);
        if (error.error.status == 401) {
          this.toastr.warning('You are not authorized for this site!', 'Authorization');
          this.router.navigate(["/login"]);
        } else {
          this.toastr.error('Query error, please try again later.', 'Error');
        }
      });
  }

  addRow() {
    this.gaps.push(new Gap(++this.lastIndex, this.poll["poll_id"], new Date(), new Date()));
    // console.warn("Gap added!");
    // console.log("Gaps:");
    // console.log(this.gaps);

    this.gapsAddForm.addControl('start' + this.lastIndex,
      new FormControl('',
        [
          Validators.required
        ])
    );
    this.gapsAddForm.addControl('end' + this.lastIndex,
      new FormControl('',
        [
          Validators.required
        ])
    );

    // console.log(this.gapsAddForm);
  }

  deleteRow(gap: Gap) {
    const index = this.gaps.indexOf(gap);

    // console.log("Before delete..." + index)
    // console.log(this.gapsAddForm);

    this.gapsAddForm.removeControl('start' + (index + 1));
    this.gapsAddForm.removeControl('end' + (index + 1));

    this.gaps.splice(index, 1);

    // console.warn("Gap deleted!");
    // console.log("Gaps:");
    // console.log(this.gaps);

    // console.log(this.gapsAddForm);
  }

  onSubmit() {
    this.gapService.addGaps(this.gaps).subscribe(
      () => {
        this.toastr.success('Gaps added successful!');
        this.router.navigate(["/polls/edit/" + this.poll["url"]]);
      },
      error => {
        console.log(error);
        this.toastr.error('User is not on Database.', 'ERROR', { progressBar: true });
      }
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
