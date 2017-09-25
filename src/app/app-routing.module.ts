import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookieXSRFStrategy, XSRFStrategy } from '@angular/http';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { LoginRequiredGuard } from './services/login-guard.service';
import { UserLoginComponent } from './components/authentication/user-login.component';
import { UserCreateComponent } from './components/authentication/user-create.component';
import { TimelineComponent } from './components/user/user-timeline.component';
import { FriendTimelineComponent } from './components/friend/friend-timeline.component';
import { PageNotFoundComponent } from './components/404/page-notfound.component';
import { SettingsComponent } from './components/settings/settings.component';


const appRoutes: Routes = [
    { path: 'login', component: UserLoginComponent },
    { path: 'newuser', component: UserCreateComponent },
    { path: ':username', canActivate: [ LoginRequiredGuard ], component: TimelineComponent },
    { path: 'profile/:username', canActivate: [ LoginRequiredGuard ], component: SettingsComponent },
    { path: 'timeline/:username', canActivate: [ LoginRequiredGuard ], component: FriendTimelineComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        HttpClientModule,
        HttpClientXsrfModule,
        RouterModule
    ],
    providers: [
        LoginRequiredGuard,
        { provide: XSRFStrategy, useFactory: cookieXSRFFactory }
    ]
})
export class AppRoutingModule {
}

export function cookieXSRFFactory() {
    return new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
}
