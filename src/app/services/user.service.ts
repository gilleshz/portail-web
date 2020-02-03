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
      user => this.user.next(user)
    );
  }

  clearUserInfo() {
    this.user.next(null);
  }
}
