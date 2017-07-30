import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    private loginForm: FormGroup;


    constructor(private auth: UserAuthService, private fb: FormBuilder) {
        this.rememberMe = false;
        this.showDialog = false;

        this.loginForm = this.fb.group({
            username: [this.usernameOrEmail, [ Validators.maxLength(40), Validators.required ]],
            password: [this.password, [ Validators.required ]],
            remember: false
        });
    }

    ngOnInit() {
    }

    login() {
        this.usernameOrEmail = this.loginForm.get('username').value;
        this.password = this.loginForm.get('password').value;
        this.rememberMe = this.loginForm.get('remember').value;
        this.loginForm.reset();

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
