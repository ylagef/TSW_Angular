import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {


    loggedUser = new Subject();

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string) {

        return this.http.post<any>(`http://localhost:3000/api/v1/users/login`, { username, password })
            .pipe(map(res => {
                // login successful if there's a jwt token in the response
                var user: User = null;

                if (res["response"][0] && res["response"][1]) {
                    user = new User(res["response"][0]["user_id"], res["response"][0]["username"],
                        res["response"][0]["name"], res["response"][0]["email"]);
                    user.jwt = res["response"][1];
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.loggedUser.next(user);
                }

                return user;
            }));
    }

    reLogin() {
        if (localStorage.getItem('currentUser') != null) {
            this.loggedUser.next(JSON.parse(localStorage.getItem('currentUser')));
        }
    }
    logout() {
        // remove user from local storage to log user out
        this.loggedUser.next(undefined);
        localStorage.removeItem('currentUser');
        this.router.navigate(["/"]);
    }
}