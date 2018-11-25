import { Component, OnInit } from '@angular/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Gap } from 'src/app/_models/gap.model';

@Component({
  selector: 'app-gap-add',
  templateUrl: './gap-add.component.html',
  styleUrls: ['./gap-add.component.scss']
})
export class GapAddComponent implements OnInit {
  private today: string;
  private gapsAddForm: FormGroup;
  private gaps: Gap[];
  private lastIndex: number;

  constructor() {
    let dateFormat = require('dateformat');
    let now = new Date();
    this.today = dateFormat(now, "yyyy-mm-d");
    this.gaps = [];
    this.lastIndex = 0;

    console.log("Gaps:");
    console.log(this.gaps);
  }

  ngOnInit() {
    this.gapsAddForm = new FormGroup({});
    this.addRow();
  }

  addRow() {
    this.gaps.push(new Gap(++this.lastIndex));
    console.warn("Gap added!");
    console.log("Gaps:");
    console.log(this.gaps);

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
  }

  deleteRow(gap: Gap) {
    const index = this.gaps.indexOf(gap);
    this.gaps.splice(index, 1);

    console.warn("Gap deleted!");
    console.log("Gaps:");
    console.log(this.gaps);
  }
}
