import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from 'src/app/components/login/login.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NewsComponent } from 'src/app/components/news/news.component';
import { TrombiComponent } from 'src/app/components/trombi/trombi.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireRemoteConfigModule } from '@angular/fire/remote-config';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { UserCardComponent } from 'src/app/components/trombi/user-card/user-card.component';
import { UpdateUserComponent } from 'src/app/components/dialog/update-user/update-user.component';
import {RolePipe} from 'src/app/pipes/role.pipe';
import { ArticleComponent } from './components/news/article/article.component';
import { NewArticleComponent } from './components/news/new-article/new-article.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { StorageComponent } from 'src/app/components/storage/storage.component';
import { FileComponent } from 'src/app/components/storage/file/file.component';
import { DirectoryComponent } from 'src/app/components/storage/directory/directory.component';
import { UploadFileComponent } from './components/dialog/upload-file/upload-file.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DropzoneDirective } from './directives/dropzone.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NewsComponent,
    TrombiComponent,
    NavigationComponent,
    DashboardComponent,
    UserCardComponent,
    UpdateUserComponent,
    RolePipe,
    ArticleComponent,
    NewArticleComponent,
    StorageComponent,
    FileComponent,
    DirectoryComponent,
    UploadFileComponent,
    DropzoneDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    AngularFireRemoteConfigModule,
    AngularFireStorageModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    CKEditorModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [
    UpdateUserComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
