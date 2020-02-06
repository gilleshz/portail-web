import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Article, ArticleTemplate } from '../models/article';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import {User} from '../models/user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesCollection: AngularFirestoreCollection<Article>;
  articles: Observable<Article[]>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.articlesCollection = firestore.collection<Article>('news');
    this.articles = this.articlesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Article;
          const uid = action.payload.doc.id;
          return { uid, ...data };
        });
      }),
    );
  }

  updateArticle(uid: string, article: Article) {
    return this.firestore.collection('news').doc(uid).set(article);
  }

  createArticle(title: string, content: string) {
    const currentUser = this.angularFireAuth.auth.currentUser;
    if (currentUser == null) {
      return;
    }

    const author = this.firestore.collection<User>('users').doc(currentUser.uid).ref as firebase.firestore.DocumentReference<User>;
    const date = firebase.firestore.Timestamp.fromDate(new Date());

    const articleTemplate: ArticleTemplate = {
      title,
      content,
      author,
      date
    };

    return this.firestore.collection('news').add(articleTemplate);
  }
}
