import {User} from './user';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Article {
  uid: string;
  title: string;
  content: string;
  date: Timestamp;
  author: firebase.firestore.DocumentReference<User>;
}
