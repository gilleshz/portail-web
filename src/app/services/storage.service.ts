import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
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
}
