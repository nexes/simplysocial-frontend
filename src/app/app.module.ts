import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/authentication/user-login.component';
import { ModalDialogComponent } from './components/dialog/modal-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
