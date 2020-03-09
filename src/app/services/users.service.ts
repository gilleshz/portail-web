import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { UsersHelper } from 'src/app/helpers/users.helper';

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
    this.users = this.usersCollection.valueChanges({ idField: 'uid'}).pipe(
      map(users => users.sort(UsersHelper.compareByJoinDate).reverse())
    );
  }

  updateUser(uid: string, user: User) {
    return this.firestore.collection('users').doc(uid).set(user);
  }
}
