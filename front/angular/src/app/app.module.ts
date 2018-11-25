import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { LanguageComponent } from './components/language/language.component';
import { UserService } from './_services/user.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PollComponent } from './components/poll/poll.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PollViewComponent } from './components/poll/poll-view/poll-view.component';
import { PollIndexComponent } from './components/poll/poll-index/poll-index.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PollAddComponent } from './components/poll/poll-add/poll-add.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    LanguageComponent,
    PollComponent,
    PageNotFoundComponent,
    PollViewComponent,
    PollIndexComponent,
    RegistrationComponent,
    PollAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
