import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn;
  }

  get username() {
    return this.authenticationService.user.getValue().firstName;
  }

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
  }

  logOut() {
    this.authenticationService.signOut();
  }
}
