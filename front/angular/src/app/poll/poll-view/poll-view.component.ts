import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';
import { Poll } from 'src/app/models/poll.model';

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss']
})
export class PollViewComponent implements OnInit {
  private id: number;
  private poll: Poll;

  constructor(private route: ActivatedRoute, private pollService: PollService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.pollService.getById(this.id).subscribe(
          data => {
            this.poll = new Poll(data["response"][0].poll_id, data["response"][0].title, data["response"][0].place
              , data["response"][0].author, data["response"][0].url);
          },
          error => console.log(error)
        )
      }
    );
  }

}
