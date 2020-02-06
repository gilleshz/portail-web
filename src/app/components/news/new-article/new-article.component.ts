import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'src/app/services/news.service';
import * as CKEditor from '@ckeditor/ckeditor5-build-classic';
import {ArticleTemplate} from '../../../models/article';

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
  ckEditor = CKEditor;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

  close() {
    this.closeForm.emit(null);
  }

  publish() {
    this.newsService.createArticle(this.form.value.title, this.form.value.content).then(
      () => this.close()
    );
  }

}
