import { User } from 'src/app/models/user';

export class UsersHelper {
  public static compareByJoinDate(a: User, b: User): number {
    if (!!a.joinDate && !!b.joinDate) {
      return 0;
    }
    if (!!a.joinDate || (a.joinDate.toDate() < b.joinDate.toDate())) {
      return -1;
    } else if (!!b.joinDate || (a.joinDate.toDate() > b.joinDate.toDate())) {
      return 1;
    } else {
      return 0;
    }
  }
}
