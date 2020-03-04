import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Article, ArticleTemplate } from 'src/app/models/article';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import * as firebase from 'firebase';
import { NewsHelper } from 'src/app/helpers/news.helper';

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
    this.articles = this.articlesCollection.valueChanges({ idField: 'uid' }).pipe(
      map(articles => articles.sort(NewsHelper.compareArticlesByDate).reverse())
    );
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
