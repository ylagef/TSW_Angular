import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models/user.model';
import { Md5 } from "md5-typescript";

@Injectable({ providedIn: 'root' })
export class UserService {
    url: string = "http://localhost:3000/api/v1/users/";
    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        if (JSON.parse(localStorage.getItem("currentUser")) != null) {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).token
            })
        }
    }

    register(data) {
        data["password"] = Md5.init(data["password"]);
        data["password_confirm"] = null;

        return this.http.post<any>(`http://localhost:3000/api/v1/users/register`, { data });
    }

    getAll() {
        return this.http.get<User[]>(this.url, { headers: this.headers });
    }

    getById(id) {
        return this.http.get<User>(this.url + id, { headers: this.headers });
    }
}