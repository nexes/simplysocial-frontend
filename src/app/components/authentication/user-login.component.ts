import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';


@Component({
    selector: 'app-user-login',
    templateUrl: 'user-login.component.html',
    styleUrls: [ 'user-login.component.css' ],
    providers: [ UserAuthService ]
})
export class UserLoginComponent implements OnInit {
    private usernameOrEmail: string;
    private password: string;
    private rememberMe: boolean;
    private errorTitle: string;
    private errorMessage: string;
    private showDialog: boolean;


    constructor(private auth: UserAuthService) {
        this.rememberMe = false;
        this.showDialog = false;
    }

    ngOnInit() {
    }

    login() {
        this.auth.login(this.usernameOrEmail, this.password).subscribe(
            (resp) => {
                console.log('got data');
                console.log(resp);
            },
            (err) => {
                this.errorTitle = 'Login failed:';
                this.errorMessage = err.error[ 'message' ];
                this.showDialog = true;
            },
            () => {
                // route from here
                console.log('all done');
            }
        );
    }

    closeDialog() {
        this.showDialog = false;
    }
}
