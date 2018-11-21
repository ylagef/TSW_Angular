import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    private url: string = "http://localhost:3000/api/v1/users/";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.url);
    }

    getById(id) {
        return this.http.get<User>(this.url + "/" + id);
    }
}