import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user.model';
import { Md5 } from "md5-typescript";

@Injectable({ providedIn: 'root' })
export class UserService {
    private url: string = "http://localhost:3000/api/v1/users/";

    constructor(private http: HttpClient) { }

    register(data) {
        data["password"] = Md5.init(data["password"]);
        data["password_confirm"] = null;

        return this.http.post<any>(`http://localhost:3000/api/v1/users/register`, { data });
    }

    getAll() {
        return this.http.get<User[]>(this.url);
    }

    getById(id) {
        return this.http.get<User>(this.url + "/" + id);
    }
}