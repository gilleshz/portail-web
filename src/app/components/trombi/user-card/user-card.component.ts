import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { UpdateUserComponent } from 'src/app/components/dialog/update-user/update-user.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  dialogOpened = false;

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    this.dialogOpened = true;

    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '500px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpened = false;
      if (result) {
        this.usersService.updateUser(this.user.uid, result);
        this.user = result;
      }
    });
  }
}
