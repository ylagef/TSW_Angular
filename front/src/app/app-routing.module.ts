import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PollIndexComponent } from './components/poll/poll-index/poll-index.component';
import { PollViewComponent } from './components/poll/poll-view/poll-view.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { PollAddComponent } from './components/poll/poll-add/poll-add.component';
import { AssignationAddComponent } from './components/assignation/assignation-add/assignation-add.component';
import { GapAddComponent } from './components/gap/gap-add/gap-add.component';
import { AssignationEditComponent } from './components/assignation/assignation-edit/assignation-edit.component';
import { PollEditComponent } from './components/poll/poll-edit/poll-edit.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/edit',
    component: UserEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'polls',
    component: PollIndexComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'polls/add',
    component: PollAddComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'polls/view/:url',
    component: PollViewComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'polls/edit/:url',
    component: PollEditComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'gaps/add/:url',
    component: GapAddComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'assignations/add/:url',
    component: AssignationAddComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'assignations/edit/:url',
    component: AssignationEditComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
