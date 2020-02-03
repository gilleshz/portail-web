import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-trombi',
  templateUrl: './trombi.component.html',
  styleUrls: ['./trombi.component.scss']
})
export class TrombiComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private usersService: UsersService) {
    this.users = usersService.users;
  }

  ngOnInit() {
  }

}
