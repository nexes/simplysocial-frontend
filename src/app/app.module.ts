import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialComponentModule } from './app-ui.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserLoginComponent } from './components/authentication/user-login.component';
import { UserCreateComponent } from './components/authentication/user-create.component';
import { TimelineComponent } from './components/user/user-timeline.component';
import { PageNotFoundComponent } from './components/404/page-notfound.component';
import { SettingsComponent } from './components/settings/settings.component';
import {
  ErrorDialogTemplateComponent,
  PostDialogTemplateComponent,
  ModalDialogService
} from './components/dialog/modal-dialog.component';

import { UserAuthenticationService } from './services/user-auth.service';
import { UserDataService } from './services/user-data.service';
import { NavBarService } from './services/navbar.service';
import { UserPostService } from './services/user-post.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserLoginComponent,
    UserCreateComponent,
    ErrorDialogTemplateComponent,
    PostDialogTemplateComponent,
    PageNotFoundComponent,
    TimelineComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialComponentModule
  ],
  providers: [
    UserAuthenticationService,
    UserDataService,
    ModalDialogService,
    NavBarService,
    UserPostService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ErrorDialogTemplateComponent,
    PostDialogTemplateComponent
  ]
})
export class AppModule { }
