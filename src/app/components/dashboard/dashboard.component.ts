import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { Article } from 'src/app/models/article';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  article: Observable<Article>;
  users: Observable<User[]>;

  constructor(
    private newsService: NewsService,
    private usersService: UsersService
  ) {
    this.article = newsService.articles.pipe(map(articles => articles.length > 0 ? articles[0] : null));
    this.users = usersService.users.pipe(map(users => users.slice(0,2)));
  }
}
