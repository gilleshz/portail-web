import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Reference } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  private currentPath = '';
  subDirectories: Reference[] = [];
  files: Reference[] = [];
  url = '';

  get path() {
    return this.currentPath;
  }

  set path(path: string) {
    this.currentPath = path;
    this.storageService.listAll(path).subscribe(
      results => {
        this.subDirectories = results.prefixes;
        this.files = results.items;
      }
    );
  }

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.path = '';
  }

  downloadFile(path: string) {
    return this.storageService.downloadFile(path);
  }
}
