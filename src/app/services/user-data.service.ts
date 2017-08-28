import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';



// the data that describes our current user. Some of the values will be updated at different times.
export interface CurrentUser {
    username?: string;
    isActive?: boolean;
    userid?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    avatar?: string;
    postCout?: number;
    followers?: number;
    following?: number;
    description?: string;
    password?: string; // this is only ever used when creating a new user
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

    get userID(): number {
        return this.currentUser.userid;
    }

    get username(): string {
        return this.currentUser.username;
    }

    get email(): string {
        return this.currentUser.email;
    }

    get avatar(): string {
        return this.currentUser.avatar;
    }

    get name(): string {
        return `${this.currentUser.firstname} ${this.currentUser.lastname}`;
    }

    get description(): string {
        return this.currentUser.description;
    }

    ngOnDestroy() {
        this.dataBus.unsubscribe();
    }
}
