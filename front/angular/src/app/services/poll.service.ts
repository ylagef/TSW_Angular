import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Poll } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private url: string = "http://localhost:3000/api/v1/polls/";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Poll[]>(this.url);
  }

  getById(id) {
    return this.http.get<Poll>(this.url + "/" + id);
  }

}
