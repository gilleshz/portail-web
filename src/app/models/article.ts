import { User } from 'src/app/models/user';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface ArticleTemplate {
  title: string;
  content: string;
  author: firebase.firestore.DocumentReference<User>;
  date: Timestamp;
}

export interface Article extends ArticleTemplate {
  uid?: string;
}
