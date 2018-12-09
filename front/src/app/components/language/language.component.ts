import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  spanish() {
    localStorage.setItem('locale', 'es');
    window.location.reload();
  }

  english() {
    localStorage.setItem('locale', 'en');
    window.location.reload();
  }
}
