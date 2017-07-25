import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-user-login',
    templateUrl: 'user-login.component.html',
    styleUrls: [ 'user-login.component.css' ]
})
export class UserLoginComponent implements OnInit {
    private usernameOrEmail: string;
    private password: string;
    private rememberMe: boolean;

    constructor() {
        this.rememberMe = false;
    }

    ngOnInit() {

    }

    login() {
        console.log('login called');
        console.log(this.usernameOrEmail);
        console.log(this.password);
        console.log(this.rememberMe);
    }

    newUser() {
        console.log('new user called');
    }
}
