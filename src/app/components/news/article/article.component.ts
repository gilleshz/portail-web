import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../../models/article';
import {User} from '../../../models/user';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  author: User = undefined;

  constructor() { }

  ngOnInit() {
    this.article.author.get().then(user => this.author = user.data());
  }

}
