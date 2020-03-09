import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { UpdateUserComponent } from 'src/app/components/dialog/update-user/update-user.component';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';
import { UploadFileComponent } from 'src/app/components/dialog/upload-file/upload-file.component';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  dialogOpened = false;

  get userFullName() {
    return this.user.firstName && this.user.lastName ? this.user.firstName + ' ' + this.user.lastName : 'Anonyme';
  }

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
  }

  openEditionDialog(): void {
    if (!this.userService.canUpdateUser(this.user)) {
      return;
    }

    this.dialogOpened = true;

    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '500px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpened = false;
      if (result) {
        result.joinDate = result.joinDate ? firebase.firestore.Timestamp.fromDate(result.joinDate) : null;
        this.usersService.updateUser(this.user.uid, {...this.user, ...result });
      }
    });
  }

  openUploadDialog(): void {
    if (this.dialogOpened || !this.userService.canUpdateUser(this.user)) {
      return;
    }

    this.dialogOpened = true;

    const dialogRef = this.dialog.open(
      UploadFileComponent,
      { width: '500px', data: { path: 'Trombinoscope', fileName: this.user.email, maxFiles: 1, accept: ['.jpg', '.png'] } }
    );

    dialogRef.afterClosed().subscribe((result: Array<Observable<string>>) => {
      this.dialogOpened = false;
      if (result) {
        result.pop().subscribe(
          url => {
            this.user.photoURL = url;
            this.usersService.updateUser(this.user.uid, this.user);
          }
        );
      }
    });
  }

  canUpdateUser() {
    return this.userService.canUpdateUser(this.user);
  }
}
