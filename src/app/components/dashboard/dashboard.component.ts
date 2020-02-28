import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  users: Observable<User[]>;

  constructor(
    private usersService: UsersService
  ) {
    this.users = usersService.users.pipe(map(users => users.reverse().slice(0,2)));
  }
}
