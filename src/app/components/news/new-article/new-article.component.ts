import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  @Output() closeForm = new EventEmitter<null>();

  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

  close() {
    this.closeForm.emit(null);
  }

  publish() {
    this.close();
  }

}
