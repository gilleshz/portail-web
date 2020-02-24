import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserCardComponent } from 'src/app/components/trombi/user-card/user-card.component';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  uploadProgress: Observable<number>;
  showProgressBar = false;
  path: string;
  isHovering: boolean;
  files: File[] = [];

  constructor(
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    this.path = data;
  }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.files = event.target.files;
  }

  upload() {
    this.showProgressBar = true;
    const observables: Array<Observable<number>> = [];
    this.files.forEach(
      file => {
        const ref = this.storage.ref(this.path + '/' + file.name);
        const task = ref.put(file);
        observables.push(task.percentageChanges());
      }
    );
    this.uploadProgress = combineLatest(observables).pipe(
      map(progresses => progresses.reduce((a, b) => a + b, 0) / this.files.length),
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

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }

    this.upload();
  }
}
