import { PipeTransform, Pipe } from '@angular/core';
import {RolesHelper} from 'src/app/helpers/roles.helper';

@Pipe({ name: 'role' })
export class RolePipe implements PipeTransform {
  transform(value) {
    return RolesHelper.getFormattedRole(value);
  }
}
