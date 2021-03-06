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

  hasRoles(): boolean {
    return !!this.user.getValue() && !!this.user.getValue().roles;
  }

  isAdmin(): boolean {
    return this.hasRoles() ? this.user.getValue().roles.includes('admin') : false;
  }

  isClient(): boolean {
    return this.hasRoles() ? this.user.getValue().roles.includes('client') : false;
  }

  isEmployee(): boolean {
    return this.hasRoles() ? this.user.getValue().roles.includes('employee') : false;
  }

  canUpdateUser(user: User): boolean {
    return this.isAdmin() || (this.user.getValue() && user.uid === this.user.getValue().uid);
  }

  canUpdateUserRoles() {
    return this.isAdmin();
  }

  canAddArticles() {
    return this.isAdmin();
  }

  canUploadFiles() {
    return this.isAdmin() || this.isEmployee();
  }

  canDeleteFiles() {
    return this.isAdmin();
  }
}
