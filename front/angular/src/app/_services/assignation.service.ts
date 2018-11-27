import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Assignation } from '../_models/assignation.model';

@Injectable({
  providedIn: 'root'
})
export class AssignationService {
  private url: string = "http://localhost:3000/api/v1/assignations/";
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

  getById(id: number) {
    return this.http.get(this.url + "/" + id, { headers: this.headers });
  }

  addAssignations(assignations: Map<number, Assignation>) {
    console.log("Assignations:");
    console.log(assignations);
    console.log("Entries:");
    console.log(assignations.values());
    const data = Array.from(assignations.values());
    console.log(data);

    return this.http.post(this.url + "/", { headers: this.headers, data: data });
  }
}
