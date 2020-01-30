import { Component, OnInit } from '@angular/core';
import {User} from '../../models/users';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Component({
  selector: 'app-trombi',
  templateUrl: './trombi.component.html',
  styleUrls: ['./trombi.component.scss']
})
export class TrombiComponent implements OnInit {

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  ngOnInit() {
  }

}
