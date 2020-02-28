import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { NewsHelper } from 'src/app/helpers/news.helper';
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
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as User;
          const uid = action.payload.doc.id;
          return { uid, ...data };
        });
      }),
    );
  }

  updateUser(uid: string, user: User) {
    return this.firestore.collection('users').doc(uid).set(user);
  }
}
