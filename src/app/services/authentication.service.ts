import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  firebaseUser: BehaviorSubject<firebase.User> = new BehaviorSubject(null);
  isLoggedIn = false;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.checkLocalStorage();
  }

  signUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.onLogInSuccessful(res.user);
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
        this.onLogInSuccessful(res.user);
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
        localStorage.clear();
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Something went wrong:', error.message);
      });
  }

  checkLocalStorage() {
    if (!localStorage.getItem('user')) {
      this.subscribeToFireAuth();
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      this.firebaseUser.next(user);
      this.fetchUserInfo(user.uid);
      this.isLoggedIn = true;
    }
  }

  subscribeToFireAuth() {
    this.angularFireAuth.authState.subscribe(
      userData => {
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
          this.firebaseUser.next(userData);
          this.fetchUserInfo(userData.uid);
        } else {
          localStorage.clear();
          this.user.next(null);
          this.firebaseUser.next(null);
        }
      }
    );
  }

  fetchUserInfo(uid: number|string) {
    this.firestore.doc<User>('users/' + uid).valueChanges().subscribe(
      user => this.user.next(user)
    );
  }

  onLogInSuccessful(user: firebase.User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.firebaseUser.next(user);
    this.isLoggedIn = true;
    this.router.navigate(['/dashboard']);
  }
}
