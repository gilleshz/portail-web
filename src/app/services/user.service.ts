import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
  }

  fetchUserInfo(uid: number|string) {
    this.firestore.doc<User>('users/' + uid).valueChanges().subscribe(
      user => this.user.next({ uid, ...user})
    );
  }

  clearUserInfo() {
    this.user.next(null);
  }

  isAdmin(): boolean {
    if (!this.user.getValue()) {
      return false;
    }
    return this.user.getValue().roles.includes('admin');
  }

  isClient(): boolean {
    if (!this.user.getValue()) {
      return false;
    }
    return this.user.getValue().roles.includes('client');
  }

  isEmployee(): boolean {
    if (!this.user.getValue()) {
      return false;
    }
    return this.user.getValue().roles.includes('employee');
  }

  canUpdateUser(user: User): boolean {
    return this.isAdmin() || (this.user.getValue() && user.uid === this.user.getValue().uid);
  }

  canUpdateUserRoles() {
    return this.isAdmin();
  }
}
