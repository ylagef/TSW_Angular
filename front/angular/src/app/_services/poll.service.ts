import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Poll } from '../_models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private url: string = "http://localhost:3000/api/v1/polls/";
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).token
    })
  }

  getAll() {
    return this.http.get<Poll[]>(this.url, { headers: this.headers });
  }

  getByUrl(poll_url) {
    return this.http.get<Poll>(this.url + poll_url, { headers: this.headers });
  }

  create(data) {
    data["author"] = JSON.parse(localStorage.getItem("currentUser"))["user_id"];
    return this.http.post<any>(this.url, data, { headers: this.headers });
  }

  edit(poll: Poll) {
    // Edit poll
    return this.http.put<Poll>(this.url, poll, { headers: this.headers });
  }

}
