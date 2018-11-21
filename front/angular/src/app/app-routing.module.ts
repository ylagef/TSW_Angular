import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PollComponent } from './poll/poll.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PollIndexComponent } from './poll/poll-index/poll-index.component';
import { PollViewComponent } from './poll/poll-view/poll-view.component';


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
    pathMatch: 'full'
  },
  {
    path: 'polls/index',
    component: PollIndexComponent,
    pathMatch: 'full'
  },
  {
    path: 'polls/view/:id',
    component: PollViewComponent,
    pathMatch: 'full'
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
