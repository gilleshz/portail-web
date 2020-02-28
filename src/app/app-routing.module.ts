import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from 'src/app/components/dashboard/dashboard.component';
import {LoginComponent} from 'src/app/components/login/login.component';
import {NewsComponent} from 'src/app/components/news/news.component';
import {TrombiComponent} from 'src/app/components/trombi/trombi.component';
import {LoggedInGuard} from 'src/app/logged-in.guard';
import {LoggedOutGuard} from 'src/app/logged-out.guard';
import { StorageComponent } from 'src/app/components/storage/storage.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard]  },
  { path: 'news', component: NewsComponent, canActivate: [LoggedInGuard]  },
  { path: 'trombinoscope', component: TrombiComponent, canActivate: [LoggedInGuard]  },
  { path: 'storage', component: StorageComponent, canActivate: [LoggedInGuard]  },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
