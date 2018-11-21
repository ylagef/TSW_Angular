import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class LoginService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string) {
        const params = new HttpParams().set('username', username).set('password', password);

        return this.http.post('http://localhost:3000/api/v1/users/login', params, this.httpOptions);
    }
}