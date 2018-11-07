import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private url: string = "http://localhost:3000/api/v1/polls/";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url);
  }

  getById(id) {
    return this.http.get(this.url + "/" + id);
  }

}
