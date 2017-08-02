import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRequiredGuard } from './services/login-guard.service';
import { UserLoginComponent } from './components/authentication/user-login.component';
import { UserCreateComponent } from './components/authentication/user-create.component';
import { TimelineComponent } from './components/user/user-timeline.component';
import { PageNotFoundComponent } from './components/404/page-notfound.component';


const appRoutes: Routes = [
    { path: 'login', component: UserLoginComponent },
    { path: 'newuser', component: UserCreateComponent },
    { path: 'profile/:username', canActivate: [ LoginRequiredGuard ], component: TimelineComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        LoginRequiredGuard
    ]
})
export class AppRoutingModule { }
