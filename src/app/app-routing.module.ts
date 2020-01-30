import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {NewsComponent} from './components/news/news.component';
import {TrombiComponent} from './components/trombi/trombi.component';
import {LoggedInGuard} from './logged-in.guard';
import {LoggedOutGuard} from './logged-out.guard';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard]  },
  { path: 'news', component: NewsComponent, canActivate: [LoggedInGuard]  },
  { path: 'trombinoscope', component: TrombiComponent, canActivate: [LoggedInGuard]  },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
