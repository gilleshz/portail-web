import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { combineLatest, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  uploadProgress: Observable<number>;
  showProgressBar = false;
  path: string;
  fileName: string;
  isHovering: boolean;
  maxFiles: number;
  accept: Array<string>;
  files: File[] = [];

  get fileInputAccept() {
    return !!this.accept ? this.accept.join(',') : '*'
  }

  constructor(
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { path: string, fileName?: string, maxFiles: number, accept: Array<string> },
  ) {
    this.path = data.path;
    this.fileName = data.fileName;
    this.maxFiles = data.maxFiles;
    this.accept = data.accept;
  }

  ngOnInit(): void {
  }

  accepts(fileExtension: string) {
    return this.accept === undefined ? true : this.accept.includes(fileExtension);
  }

  getExtension(fileName: string) {
    return fileName.split('.').length > 1 ? '.' + fileName.split('.').pop().toLowerCase() : '';
  }

  upload() {
    this.showProgressBar = true;
    const progressObservables: Array<Observable<number>> = [];
    const downloadUrls: Array<Observable<string>> = [];
    this.files
      .slice(0, this.maxFiles > 0 ? this.maxFiles : this.files.length)
      .forEach(
      file => {
        const extension = this.getExtension(file.name);
        if (this.accepts(extension)) {
          const fileName =  this.fileName ? this.fileName + extension : file.name;
          const path = this.path + '/' + fileName;
          const task = this.storage.ref(path).put(file);
          const percentageChanges = task.percentageChanges().pipe(
            finalize(() => downloadUrls.push(this.storage.ref(path).getDownloadURL()))
          );
          progressObservables.push(percentageChanges);
        }
      }
    );
    this.uploadProgress = combineLatest(progressObservables).pipe(
      map(progresses => progresses.reduce((a, b) => a + b, 0) / this.files.length),
      tap(
        progress => {
          if (progress === 100) {
            this.dialogRef.close(downloadUrls);
          }
        }
      )
    );
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }

    this.upload();
  }

  selectFiles(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files.item(i));
    }

    this.upload();
  }
}
