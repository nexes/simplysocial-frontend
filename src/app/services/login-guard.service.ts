import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAuthenticationService, AuthResponse } from '../services/user-auth.service';
import { UserDataService, CurrentUser } from '../services/user-data.service';


@Injectable()
export class LoginRequiredGuard implements CanActivate {
    private baseURL: string;

    constructor(private userAuth: UserAuthenticationService, private userData: UserDataService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const isActiveObserver = new Observable<boolean>(observer => {
            if (this.userData.active) {
                observer.next(true);

            } else {
                this.userAuth.isOnline(route.params[ 'username' ]).subscribe(
                    (resp: AuthResponse) => {
                        if (resp.loggedin) {
                            // the user is online, lets get profile data
                            this.userAuth.getUserProfileData(resp.userid).subscribe(
                                (user: CurrentUser) => {
                                    this.userData.updateUser({isActive: true, userid: resp.userid});
                                    this.userData.updateUser(user);
                                    observer.next(true);
                                 }
                            );

                        } else {
                            // the user is not online, lets route to the login page
                            observer.next(false);
                            this.router.navigate([ '/login' ], {
                                replaceUrl: false
                            });
                        }
                    },
                    (err) => {
                        observer.error(err);
                        observer.complete();
                        this.router.navigate([ '/login' ], {
                            replaceUrl: false
                        });
                    }
                );
            }
        });
        return isActiveObserver;
    }
}
