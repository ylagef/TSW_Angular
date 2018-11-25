import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PollIndexComponent } from './components/poll/poll-index/poll-index.component';
import { PollViewComponent } from './components/poll/poll-view/poll-view.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { PollAddComponent } from './components/poll/poll-add/poll-add.component';
import { AssignationAddComponent } from './components/assignation/assignation-add/assignation-add.component';
import { GapAddComponent } from './components/gap/gap-add/gap-add.component';

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
    path: 'gaps/add/:url',
    component: GapAddComponent,
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
