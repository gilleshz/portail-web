import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.usersCollection = firestore.collection<User>('users');
    this.users = this.usersCollection.valueChanges({ idField: 'uid'});
  }

  updateUser(uid: string, user: User) {
    return this.firestore.collection('users').doc(uid).set(user);
  }
}
