import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  firebaseUser: BehaviorSubject<firebase.User> = new BehaviorSubject(null);
  isLoggedIn = false;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) {
    if (!localStorage.getItem('user')) {
      this.subscribeToFireAuth();
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      this.firebaseUser.next(user);
      this.userService.fetchUserInfo(user.uid);
      this.isLoggedIn = true;
    }
  }

  signIn(email: string, password: string) {
    return this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.onLogInSuccessful(res.user);
      })
    ;
  }

  signOut() {
    this.angularFireAuth
      .auth
      .signOut()
      .then(() => this.onLogOutSuccessful())
      .catch(error => {
        console.error('Something went wrong:', error.message);
      });
  }

  subscribeToFireAuth() {
    this.angularFireAuth.authState.subscribe(
      userData => userData ?  this.onLogInSuccessful(userData) : this.onLogOutSuccessful()
    );
  }

  onLogInSuccessful(user: firebase.User) {
    this.isLoggedIn = true;
    this.firebaseUser.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.userService.fetchUserInfo(user.uid);
    this.router.navigate(['/dashboard']);
  }

  onLogOutSuccessful() {
    this.isLoggedIn = false;
    this.firebaseUser.next(null);
    localStorage.clear();
    this.userService.clearUserInfo();
    this.router.navigate(['/login']);
  }
}
