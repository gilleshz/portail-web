import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';
import { NewsHelper } from 'src/app/helpers/news.helper';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  articles: Observable<Article[]>;
  showForm = false;

  get canAddArticle() {
    return this.userService.canAddArticles();
  }

  constructor(
    private newsService: NewsService,
    private userService: UserService
  ) {
    this.articles = newsService.articles.pipe(
      map(articles => articles.sort(NewsHelper.compareArticlesByDate).reverse())
    );
  }

  ngOnInit() {
  }

}
