import { Component, OnInit } from "@angular/core";
import { UserService } from "../../_services/user.service";
import { User } from "../../_models/user.model";
import { AuthenticationService } from "../../_services/authentication.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  currentUser: User;
  path: string;
  constructor(private authService: AuthenticationService, private router: Router) {
    router.events.subscribe(
      data => { if (data["url"] != undefined) this.path = data["url"]; });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  logout() {
    this.authService.logout();
  }

  reloadUser() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
}
