import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAuthenticationService, AuthResponse } from '../services/user-auth.service';
import { UserDataService } from '../services/user-data.service';


@Injectable()
export class LoginRequiredGuard implements CanActivate {
    private baseURL: string;

    constructor(private userAuth: UserAuthenticationService, private userData: UserDataService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const isActiveObserver = new Observable<boolean>(observer => {
            if (this.userData.active) {
                console.log('already active');
                observer.next(true);
            } else {
                console.log('not active');
                this.userAuth.isOnline(route.params[ 'username' ]).subscribe(
                    (resp: AuthResponse) => {
                        console.log('canActivate response');

                        if (resp.loggedin) {
                            this.userData.updateUser({
                                userid: resp.userid,
                                isActive: true,
                                username: route.params[ 'username' ]
                            });

                            observer.next(true);
                            this.router.navigate([ state.url ]);

                        } else {
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
