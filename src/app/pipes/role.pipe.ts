import { PipeTransform, Pipe } from '@angular/core';
import {RolesUtils} from 'src/app/utils/roles.utils';

@Pipe({ name: 'role' })
export class RolePipe implements PipeTransform {
  transform(value) {
    return RolesUtils.getFormattedRole(value);
  }
}
