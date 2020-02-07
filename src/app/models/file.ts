import { Observable } from 'rxjs';

export interface File {
  path?: string;
  name?: string;
  downloadURL?: Observable<string>;
}

export interface FileUpload {
  uploadPercent?: Observable<number>;
  downloadURL?: Observable<string>;
}
