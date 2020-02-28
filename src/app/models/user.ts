import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface User extends firebase.User {
  firstName: string;
  lastName: string;
  phone?: string;
  team?: string;
  joinDate: Timestamp;
  roles: Array<string>;
}
