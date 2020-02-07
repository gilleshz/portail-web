import { Article } from 'src/app/models/article';

export class NewsHelper {
  public static compareArticlesByDate(a: Article, b: Article): number {
    if (a.date.toDate() < b.date.toDate()) {
      return -1;
    } else if (a.date.toDate() > b.date.toDate()) {
      return 1;
    } else {
      return 0;
    }
  }
}
