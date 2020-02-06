import {User} from './user';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface ArticleTemplate {
  title: string;
  content: string;
  author: firebase.firestore.DocumentReference<User>;
}
export interface Article extends ArticleTemplate {
  uid: string;
  date: Timestamp;
}
