import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PollComponent } from './components/poll/poll.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PollIndexComponent } from './components/poll/poll-index/poll-index.component';
import { PollViewComponent } from './components/poll/poll-view/poll-view.component';
import { AuthGuard } from './_guards/auth.guard';


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
    path: 'polls',
    component: PollComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'polls/index',
    component: PollIndexComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'polls/view/:id',
    component: PollViewComponent,
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
