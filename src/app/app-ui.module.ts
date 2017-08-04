import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
    MdMenuModule,
    MdGridListModule,
    MdInputModule,
    MdCheckboxModule,
    MdSlideToggleModule,
    MdDialogModule
} from '@angular/material';

import { UserLoginComponent } from './components/authentication/user-login.component';
import { UserCreateComponent } from './components/authentication/user-create.component';
import { TimelineComponent } from './components/user/user-timeline.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog.component';
import { PageNotFoundComponent } from './components/404/page-notfound.component';



// We will import all the angular material modules we use here.
@NgModule({
    imports: [
        BrowserAnimationsModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdMenuModule,
        MdGridListModule,
        MdInputModule,
        MdCheckboxModule,
        MdSlideToggleModule,
        MdDialogModule
    ],
    exports: [
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdMenuModule,
        MdGridListModule,
        MdInputModule,
        MdCheckboxModule,
        MdSlideToggleModule,
        MdDialogModule
    ]
})
export class AppMaterialComponentModule { }

// We will import all of our components here
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppMaterialComponentModule
    ],
    declarations: [
        UserLoginComponent,
        UserCreateComponent,
        ErrorDialogComponent,
        NavigationComponent,
        PageNotFoundComponent,
        TimelineComponent
    ],
    exports: [
        UserLoginComponent,
        UserCreateComponent,
        ErrorDialogComponent,
        NavigationComponent,
        PageNotFoundComponent,
        TimelineComponent
    ]
})
export class AppUIModule { }
