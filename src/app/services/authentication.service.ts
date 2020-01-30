import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {BehaviorSubject, Observable, of} from 'rxjs';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {User} from '../models/users';
import {AngularFireDatabase} from '@angular/fire/database';
import {switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>;
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  isLoggedIn = false;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.userData = angularFireAuth.authState;

    this.userData.subscribe(
      userData => {
        if (userData) {
          this.firestore.doc<User>('users/' + userData.uid).valueChanges().subscribe(
            user => this.user.next(user)
          );
        }
        this.user.next(null);
      }
    );
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
