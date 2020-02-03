import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn;
  }

  get user() {
    return this.userService.user.getValue();
  }

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
  }

  logOut() {
    this.authenticationService.signOut();
  }
}
