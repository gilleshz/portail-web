import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../models/users';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  get roles() {
    const roles = [];
    if (this.user.roles.client) {
      roles.push('Client');
    }
    if (this.user.roles.employee) {
      roles.push('Employé');
    }
    if (this.user.roles.admin) {
      roles.push('Administrateur');
    }
    return roles.join(', ');
  }

  constructor() {  }

  ngOnInit() {
  }

}
