import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { NavBarService } from '../../services/navbar.service';
import { UserAuthenticationService, AuthResponse } from '../../services/user-auth.service';
import { ModalDialogService } from '../../components/dialog/modal-dialog.component';


@Component({
    selector: 'app-user-login',
    templateUrl: 'user-login.component.html',
    styleUrls: [ 'user-login.component.css' ]
})
export class UserLoginComponent implements OnInit {
    private loginForm: FormGroup;
    private usernameOrEmail: string;
    private password: string;
    private rememberMe: boolean;
    private errorTitle: string;
    private errorMessage: string;
    private showDialog: boolean;


    constructor(private authService: UserAuthenticationService,
        private userDataService: UserDataService,
        private fb: FormBuilder,
        private router: Router,
        private navBar: NavBarService,
        private dialog: ModalDialogService) {

        this.rememberMe = false;
        this.showDialog = false;
        this.loginForm = this.fb.group({
            username: [ this.usernameOrEmail, [ Validators.maxLength(40), Validators.required ] ],
            password: [ this.password, [ Validators.required ] ],
            remember: false
        });

        this.navBar.showLoginNavBar();
    }

    ngOnInit() {
    }

    login() {
        this.usernameOrEmail = this.loginForm.get('username').value;
        this.password = this.loginForm.get('password').value;
        this.rememberMe = this.loginForm.get('remember').value;

        this.loginForm.reset();
        this.authService.login(this.usernameOrEmail, this.password).subscribe(
            (loginResp: AuthResponse) => {
                this.router.navigate([ '/', this.usernameOrEmail ]);
            },
            (err) => {
                console.log(err);
                this.dialog.showErrorDialog('Login error', err[ 'error' ][ 'message' ]);
            }
        );
    }

    closeDialog() {
        this.showDialog = false;
    }
}
