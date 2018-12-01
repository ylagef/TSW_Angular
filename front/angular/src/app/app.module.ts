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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PollViewComponent } from './components/poll/poll-view/poll-view.component';
import { PollIndexComponent } from './components/poll/poll-index/poll-index.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PollAddComponent } from './components/poll/poll-add/poll-add.component';
import { AssignationAddComponent } from './components/assignation/assignation-add/assignation-add.component';
import { AssignationEditComponent } from './components/assignation/assignation-edit/assignation-edit.component';
import { GapAddComponent } from './components/gap/gap-add/gap-add.component';
import { GapViewComponent } from './components/gap/gap-view/gap-view.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PollEditComponent } from './components/poll/poll-edit/poll-edit.component';

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeEn);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    LanguageComponent,
    PageNotFoundComponent,
    PollViewComponent,
    PollIndexComponent,
    RegistrationComponent,
    PollAddComponent,
    AssignationAddComponent,
    AssignationEditComponent,
    GapAddComponent,
    GapViewComponent,
    PollEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
