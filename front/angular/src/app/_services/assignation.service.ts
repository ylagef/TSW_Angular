import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Assignation } from '../_models/assignation.model';
import { User } from '../_models/user.model';

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

  editAssignations(assignationsForEdit: Map<String, Assignation>, beforeAssignations: String[], currentUser: User) {
    const error: boolean = false;

    // If new map don't has assignation from actual -> Delete it
    beforeAssignations.forEach(a => {
      if (!assignationsForEdit.has(a)) {
        this.http.delete(this.url + "/" + a.split("-")[0] + "/" + a.split("-")[1], { headers: this.headers }).subscribe(
          data => {
            console.log("Deleted ok!");
            console.log(data["response"]);
          },
          error => {
            console.error(error)
            error = true
            return error;
          }
        );
      }
    });

    // If actual map don't has assignation from edit map -> Add it
    assignationsForEdit.forEach(a => {
      if (!beforeAssignations.includes(a["gap_id"] + "-" + currentUser["user_id"])) {
        this.http.post(this.url + "/", { headers: this.headers, data: [a] }).subscribe(
          data => console.log("Success - " + data),
          error => {
            console.error(error)
            error = true;
            return error;
          }
        );
      }
    });

    return error;
  }
}
