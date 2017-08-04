import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppUIModule } from './app-ui.module';

import { AppComponent } from './app.component';

import { UserAuthService } from './services/user-auth.service';
import { UserDataService } from './services/user-data.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppUIModule,
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
