import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserCardComponent } from 'src/app/components/trombi/user-card/user-card.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {

  user: User;

  form: FormGroup = new FormGroup({
    firstName: new FormControl(this.data.firstName, [Validators.required]),
    lastName: new FormControl(this.data.lastName, [Validators.required, Validators.email]),
    email: new FormControl(this.data.email, [Validators.required, Validators.email]),
    phone: new FormControl(this.data.phone),
    roles: new FormControl(this.data.roles),
  });

  constructor(
    public dialogRef: MatDialogRef<UserCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.user = data;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
