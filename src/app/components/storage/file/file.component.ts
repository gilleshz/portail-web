import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Reference } from '@angular/fire/storage/interfaces';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() file: Reference;
  @Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>();
  downloadUrl: string;

  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.file.getDownloadURL().then(
        url => this.downloadUrl = url
    );
  }

  onContextMenu(event: MouseEvent) {
    if (!this.userService.canDeleteFiles()) {
      return;
    }
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onDelete() {
    this.file.delete().then(
      () => this.delete.emit(true)
    );
  }
}
