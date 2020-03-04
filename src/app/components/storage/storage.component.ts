import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Reference } from '@angular/fire/storage/interfaces';
import { UpdateUserComponent } from 'src/app/components/dialog/update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileComponent } from 'src/app/components/dialog/upload-file/upload-file.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  @Input() showHeader = true;

  private currentPath = '';
  subDirectories: Reference[] = [];
  files: Reference[] = [];
  url = '';

  get path() {
    return this.currentPath;
  }

  set path(path: string) {
    this.currentPath = path;
    this.refresh();
  }

  get breadcrumbPaths(): string[] {
    const pathElements = this.path.split('/').filter(elt => elt !== '');
    const parentPaths = [''];
    for (const elt of pathElements) {
      const path = parentPaths.length === 1
        ? elt
        : parentPaths[parentPaths.length - 1] + '/' + elt;
      parentPaths.push(path);
    }

    return parentPaths;
  }

  get canUploadFiles() {
    return this.userService.canAddArticles();
  }

  constructor(
    private dialog: MatDialog,
    private storageService: StorageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.path = '';
  }

  refresh() {
    this.storageService.listAll(this.currentPath).subscribe(
      results => {
        this.subDirectories = results.prefixes;
        this.files = results.items;
      }
    );
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadFileComponent, { width: '500px', data: { path: this.currentPath } });
    dialogRef.afterClosed().toPromise().finally(
      () => this.refresh()
    );
  }
}
