import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


export interface CurrentUser {
    username?: string;
    isActive?: boolean;
    userid?: number;
}

@Injectable()
export class UserDataService implements OnDestroy {
    private dataBus: Subject<CurrentUser>;
    private currentUser: CurrentUser;

    constructor() {
        this.currentUser = {};
        this.dataBus = new Subject();
    }

    listen(): Observable<CurrentUser> {
        return this.dataBus.asObservable();
    }

    updateUser(updated: CurrentUser) {
        this.currentUser.username = updated.username || this.currentUser.username;
        this.currentUser.isActive = updated.isActive || this.currentUser.isActive;
        this.currentUser.userid = updated.userid || this.currentUser.userid;

        this.dataBus.next(this.currentUser);
    }

    ngOnDestroy() {
        this.dataBus.unsubscribe();
    }
}
