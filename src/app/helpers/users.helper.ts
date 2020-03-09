import { User } from 'src/app/models/user';

export class UsersHelper {
  public static compareByJoinDate(a: User, b: User): number {
    const aDate = a.joinDate ? a.joinDate.toDate() : new Date();
    const bDate = b.joinDate ? b.joinDate.toDate() : new Date();
    if (aDate < bDate) {
      return -1;
    } else if (aDate > bDate) {
      return 1;
    } else {
      return 0;
    }
  }
}
