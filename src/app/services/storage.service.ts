import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileUpload } from 'src/app/models/file';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  listAll(path: string): Observable<firebase.storage.ListResult> {
    return fromPromise<firebase.storage.ListResult>(this.storage.storage.ref(path).listAll());
  }

  listSubDirectories(path: string) {
  }

  uploadFile(path: string, file: any): FileUpload {
    const fileRef = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    const fileUpload: FileUpload = {
      uploadPercent: task.percentageChanges()
    };

    task.snapshotChanges().pipe(
      finalize(() => fileUpload.downloadURL = fileRef.getDownloadURL() )
    ).subscribe();

    return fileUpload;
  }

  downloadFile(path: string) {
    return this.storage.ref(path).getDownloadURL();
  }
}
