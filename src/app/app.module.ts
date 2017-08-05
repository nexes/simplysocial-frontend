import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialComponentModule } from './app-ui.module';

import { AppComponent } from './app.component';
import { ErrorDialogTemplateComponent, ModalDialogService } from './components/dialog/modal-dialog.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserLoginComponent } from './components/authentication/user-login.component';
import { UserCreateComponent } from './components/authentication/user-create.component';
import { TimelineComponent } from './components/user/user-timeline.component';
import { PageNotFoundComponent } from './components/404/page-notfound.component';

import { UserAuthService } from './services/user-auth.service';
import { UserDataService } from './services/user-data.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserLoginComponent,
    UserCreateComponent,
    ErrorDialogTemplateComponent,
    PageNotFoundComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppMaterialComponentModule
  ],
  providers: [
    UserAuthService,
    UserDataService,
    ModalDialogService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ErrorDialogTemplateComponent
  ]
})
export class AppModule { }
