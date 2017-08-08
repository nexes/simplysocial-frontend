import { Injectable } from '@angular/core';


@Injectable()
export class NavBarService {
    /* I don't like/want these to be public, but it needs to be this way for now.
       call the methods to change the navbar, not these variables directly.

        This Service can be used to change the navbar on the fly.
    */
    loginNavBar: boolean;
    userNavBar: boolean;

    constructor() {
        this.loginNavBar = false;
        this.userNavBar = false;
    }

    showLoginNavBar() {
        this.loginNavBar = true;
        this.userNavBar = false;
    }

    showUserNavBar() {
        this.loginNavBar = false;
        this.userNavBar = true;
    }
}
