import * as firebase from 'firebase';

export interface User extends firebase.User {
  firstName: string;
  lastName: string;
  phone?: string;
  roles: Array<string>;
}
