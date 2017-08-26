import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticationService, AuthResponse, User } from '../../services/user-auth.service';
import { UserDataService } from '../../services/user-data.service';
import { NavBarService } from '../../services/navbar.service';
import { ModalDialogService } from '../../components/dialog/modal-dialog.component';


@Component({
    selector: 'app-create-user',
    templateUrl: 'user-create.component.html',
    styleUrls: [ 'user-create.component.css' ]
})
export class UserCreateComponent implements OnInit {
    private newUserForm: FormGroup;

    constructor(private fb: FormBuilder,
        private dialog: ModalDialogService,
        private userData: UserDataService,
        private auth: UserAuthenticationService,
        private navBar: NavBarService,
        private router: Router) {

        this.newUserForm = this.fb.group({
            fullname: [ '', [ Validators.minLength(2), Validators.maxLength(80), Validators.required ] ],
            email: [ '', [ Validators.email, Validators.required ] ],
            username: [ '', [ Validators.minLength(2), Validators.maxLength(40), Validators.required ] ],
            password: [ '', [ Validators.minLength(6), Validators.required ] ]
        });

        this.navBar.showLoginNavBar();
    }

    ngOnInit() {

    }

    createUser() {
        const name: string = this.newUserForm.get('fullname').value;
        const [ firstName, ...last ] = name.split(' ');
        const lastName = last.join(' ');

        if (firstName.length > 40 || lastName.length > 40) {
            this.dialog.showErrorDialog(
                'Oops: Name Error',
                'The first and last name needs to be less than 40 characters each'
            );

            this.newUserForm.get('password').reset();
            return;
        }
        if (lastName.length < 1) {
            this.dialog.showErrorDialog(
                'Oops: Name Error',
                'I didn\'t see a last name given'
            );

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
                this.router.navigate([ '/', newUser.username ]).then(() => {
                    this.userData.updateUser({
                        username: newUser.username,
                        firstname: newUser.firstname,
                        lastname: newUser.lastname,
                        email: newUser.email,
                        userid: resp.userid
                    });
                });
            },
            (err) => {
                this.dialog.showErrorDialog(
                    'Oops',
                    err.error[ 'message' ]
                );
                this.newUserForm.get('password').reset();
            }
        );
    }
}
