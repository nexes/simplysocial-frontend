import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/authentication/user-login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ModalDialogComponent } from './components/dialog/modal-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    ModalDialogComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    })
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
