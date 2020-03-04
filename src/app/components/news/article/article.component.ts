import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Input() prependTitle = '';

  author: User = undefined;

  constructor() { }

  ngOnInit() {
    this.article?.author.get().then(user => this.author = user.data());
  }

}
