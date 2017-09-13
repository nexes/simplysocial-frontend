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
import { FriendTimelineComponent } from './components/friend/friend-timeline.component';
import { PageNotFoundComponent } from './components/404/page-notfound.component';
import { SettingsComponent } from './components/settings/settings.component';
import {
  ErrorDialogTemplateComponent,
  PostDialogTemplateComponent,
  DeleteDialogTemplateComponent,
  SearchUserDialogTemplateComponent,
  ModalDialogService
} from './components/dialog/modal-dialog.component';

import { UserAuthenticationService } from './services/user-auth.service';
import { UserDataService } from './services/user-data.service';
import { NavBarService } from './services/navbar.service';
import { UserPostService } from './services/user-post.service';
import { UserFollowService } from './services/user-follow.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserLoginComponent,
    UserCreateComponent,
    ErrorDialogTemplateComponent,
    PostDialogTemplateComponent,
    DeleteDialogTemplateComponent,
    SearchUserDialogTemplateComponent,
    PageNotFoundComponent,
    TimelineComponent,
    FriendTimelineComponent,
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
    UserFollowService,
    UserPostService
  ],
  bootstrap: [
    AppComponent
  ],
  // these will get compiled ahead of time, these are our modal dialog windows
  entryComponents: [
    ErrorDialogTemplateComponent,
    PostDialogTemplateComponent,
    DeleteDialogTemplateComponent,
    SearchUserDialogTemplateComponent
  ]
})
export class AppModule { }
