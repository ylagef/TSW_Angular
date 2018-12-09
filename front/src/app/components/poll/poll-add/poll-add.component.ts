import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PollService } from 'src/app/_services/poll.service';

@Component({
  selector: 'app-poll-add',
  templateUrl: './poll-add.component.html',
  styleUrls: ['./poll-add.component.scss']
})
export class PollAddComponent implements OnInit {
  pollAddForm: FormGroup;

  constructor(private pollService: PollService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.pollAddForm = new FormGroup({
      title: new FormControl('',
        [
          Validators.required
        ]),
      place: new FormControl('')
    }
    );
  }

  onSubmit() {
    this.pollService.create(this.pollAddForm.value).subscribe(
      (data) => {
        this.toastr.success('Poll created correctly!');
        this.router.navigate(["/gaps/add/" + data["response"]]);
      },
      (error) => {
        console.error(error);
        if (error.error.status == 401) {
          this.toastr.warning('You are not authorized for this site!', 'Authorization');
          this.router.navigate(["/login"]);
        } else {
          if (error.error.response == null) {
            this.toastr.error('Error on poll creation. Please try again.');
          } else {
            this.toastr.error(error.error.response + '. Please try again.');
          }
        }
      }
    );
  }

}
