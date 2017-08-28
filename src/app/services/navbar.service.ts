import { Injectable } from '@angular/core';


@Injectable()
export class NavBarService {
    private _loginNavBar: boolean;
    private _userNavBar: boolean;

    constructor() {
        this._loginNavBar = false;
        this._userNavBar = false;
    }

    showLoginNavBar() {
        this._loginNavBar = true;
        this._userNavBar = false;
    }

    showUserNavBar() {
        this._loginNavBar = false;
        this._userNavBar = true;
    }

    get loginNavBar(): boolean {
        return this._loginNavBar;
    }

    get userNavBar(): boolean {
        return this._userNavBar;
    }
}
