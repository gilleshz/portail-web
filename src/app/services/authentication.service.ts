import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>;
  isLoggedIn = false;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.userData = angularFireAuth.authState;
  }

  signUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
      })
      .catch(error => {
        console.error('Something went wrong:', error.message);
      });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.error('Something went wrong:', error.message);
      });
  }

  signOut() {
    this.angularFireAuth
      .auth
      .signOut()
      .then(res => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Something went wrong:', error.message);
      });
  }

}
