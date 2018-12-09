import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Gap } from '../_models/gap.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GapService {
  url: string = "http://localhost:3000/api/v1/gaps/";
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).token
    })
  }

  getAll() {
    return this.http.get(this.url, { headers: this.headers });
  }

  getById(id) {
    return this.http.get(this.url + id, { headers: this.headers });
  }

  getGapsOfPoll(id) {
    return this.http.get(this.url + "poll/" + id, { headers: this.headers });
  }

  addGaps(gaps: Gap[]) {
    gaps.forEach(gap => {
      gap["start_date"] = gap["dates"][0];
      gap["end_date"] = gap["dates"][1];
      gap["dates"] = null;
    });

    return this.http.post(this.url, gaps, { headers: this.headers });
  }

  deleteGap(id: number) {
    return this.http.delete(this.url + "/" + id, { headers: this.headers });
  }

  editGap(gap: Gap) {
    return this.http.put(this.url, gap, { headers: this.headers });
  }
}
