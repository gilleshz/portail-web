import { Component, Input, OnInit } from '@angular/core';
import { Reference } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  @Input() directory: Reference;

  constructor() { }

  ngOnInit() {
  }

}
