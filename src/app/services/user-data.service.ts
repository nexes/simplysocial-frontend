import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


export interface CurrentUser {
    username?: string;
    isActive?: boolean;
    userid?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
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
        Object.assign(this.currentUser, updated);
        this.dataBus.next(this.currentUser);
    }

    getData(): CurrentUser {
        return this.currentUser;
    }

    getCurrentUserID(): number {
        return this.currentUser.userid;
    }

    getCurrentUsername(): string {
        return this.currentUser.username;
    }

    ngOnDestroy() {
        this.dataBus.unsubscribe();
    }
}
