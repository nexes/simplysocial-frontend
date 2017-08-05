import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAuthenticationService, AuthResponse } from '../services/user-auth.service';


@Injectable()
export class LoginRequiredGuard implements CanActivate {
    private baseURL: string;

    constructor(private userAuth: UserAuthenticationService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('LoginRequired guard');
        console.log(route);
        console.log(state);

        const isActiveObserver = new Observable<boolean>(observer => {
            this.userAuth.isOnline(route.params[ 'username' ]).subscribe(
                (resp: AuthResponse) => {
                    observer.next(resp.loggedin);
                    observer.complete();
                },
                (err) => {
                    observer.error(err);
                    observer.complete();
                    this.router.navigate([ '/login' ], {
                        replaceUrl: false
                    });
                }
            );
        });
        return isActiveObserver;
    }
}
