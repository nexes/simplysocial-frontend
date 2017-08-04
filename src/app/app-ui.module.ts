import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './components/authentication/user-login.component';
import { UserCreateComponent } from './components/authentication/user-create.component';
import { TimelineComponent } from './components/user/user-timeline.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog.component';
import { PageNotFoundComponent } from './components/404/page-notfound.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
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
