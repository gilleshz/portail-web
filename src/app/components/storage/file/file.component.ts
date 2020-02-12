import { Component, Input, OnInit } from '@angular/core';

import { Reference } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() file: Reference;
  downloadUrl: string;

  constructor() { }

  ngOnInit() {
    this.file.getDownloadURL().then(
        url => this.downloadUrl = url
    );
  }

}
