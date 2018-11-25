import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GapService {
  private url: string = "http://localhost:3000/api/v1/gaps/";
  private headers: HttpHeaders;
  
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
    return this.http.get(this.url + "/" + id, { headers: this.headers });
  }

  getGapsOfPoll(id){
    return this.http.get(this.url + "/poll/" + id, { headers: this.headers });
  }

}
