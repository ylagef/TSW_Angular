import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { LanguageComponent } from './language/language.component';
import { LoginService } from './login/login.service';
import { UserService } from './user/user.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PollComponent } from './poll/poll.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PollViewComponent } from './poll/poll-view/poll-view.component';
import { PollIndexComponent } from './poll/poll-index/poll-index.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    LanguageComponent,
    PollComponent,
    PageNotFoundComponent,
    PollViewComponent,
    PollIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    LoginService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
