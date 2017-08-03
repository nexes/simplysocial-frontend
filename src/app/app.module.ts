import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserAuthService } from './services/user-auth.service';
import { UserDataService } from './services/user-data.service';
import { UserLoginComponent } from './components/authentication/user-login.component';
import { UserCreateComponent } from './components/authentication/user-create.component';
import { TimelineComponent } from './components/user/user-timeline.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog.component';
import { PageNotFoundComponent } from './components/404/page-notfound.component';



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserCreateComponent,
    ErrorDialogComponent,
    NavigationComponent,
    PageNotFoundComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    })
  ],
  providers: [
    UserAuthService,
    UserDataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
