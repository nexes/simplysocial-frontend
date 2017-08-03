import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService, AuthResponse, User } from '../../services/user-auth.service';
import { UserDataService } from '../../services/user-data.service';


@Component({
    selector: 'app-create-user',
    templateUrl: 'user-create.component.html',
    styleUrls: [ 'user-create.component.css' ]
})
export class UserCreateComponent implements OnInit {
    private newUserForm: FormGroup;
    private showError: boolean;
    private errorTitle: string;
    private errorMsg: string;

    constructor(private fb: FormBuilder, private userData: UserDataService, private auth: UserAuthService, private router: Router) {
        this.newUserForm = this.fb.group({
            fullname: [ '', [ Validators.minLength(2), Validators.maxLength(80), Validators.required ] ],
            email: [ '', [ Validators.email, Validators.required ] ],
            username: [ '', [ Validators.minLength(2), Validators.maxLength(40), Validators.required ] ],
            password: [ '', [ Validators.minLength(6), Validators.required ] ]
        });
    }

    ngOnInit() {

    }

    closeErrorDialog() {
        this.showError = false;
        this.errorTitle = '';
        this.errorMsg = '';
    }

    createUser() {
        const name: string = this.newUserForm.get('fullname').value;
        const [firstName, ...last] = name.split(' ');
        const lastName = last.join(' ');

        if (firstName.length > 40 || lastName.length > 40) {
            this.errorTitle = 'Oops: Name Error';
            this.errorMsg = 'The first and last name needs to be less than 40 characters each';
            this.showError = true;

            this.newUserForm.get('password').reset();
            return;
        }
        if (lastName.length < 1) {
            this.errorTitle = 'Oops: Name Error';
            this.errorMsg = 'I didn\'t see a last name given';
            this.showError = true;

            this.newUserForm.get('password').reset();
            return;
        }

        const newUser: User = {
            firstname: firstName,
            lastname: lastName,
            username: this.newUserForm.get('username').value,
            password: this.newUserForm.get('password').value,
            email: this.newUserForm.get('email').value
        };

        this.auth.newUser(newUser).subscribe(
            (resp: AuthResponse) => {
                this.router.navigate([ '/profile/', newUser.username ]).then(() => {
                    this.userData.updateUser({
                        username: newUser.username,
                        firstname: newUser.firstname,
                        lastname: newUser.lastname,
                        email: newUser.email,
                        userid: resp.userid
                    });
                });
                console.log(resp);
            },
            (err) => {
                this.errorTitle = 'Oops';
                this.errorMsg = err.error[ 'message' ];
                this.showError = true;
                this.newUserForm.get('password').reset();
            }
        );
    }
}
