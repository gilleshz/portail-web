import {Roles} from './roles';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  phone?: string;
  roles: Roles;
}
