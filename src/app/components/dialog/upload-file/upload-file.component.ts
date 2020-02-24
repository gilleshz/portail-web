import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserCardComponent } from 'src/app/components/trombi/user-card/user-card.component';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  showProgressBar = false;
  path: string;

  constructor(
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    this.path = data;
  }

  ngOnInit(): void {
  }

  upload(event) {
    const file = event.target.files[0];
    console.log(this.path);
    this.ref = this.storage.ref(this.path + '/' + file.name);
    this.task = this.ref.put(file);
    this.showProgressBar = true;
    this.uploadProgress = this.task.percentageChanges().pipe(
      tap(
        progress => {
          if (progress === 100) {
            this.dialogRef.close();
          }
        }
      )
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
