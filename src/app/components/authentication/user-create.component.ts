import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService, AuthResponse, User } from '../../services/user-auth.service';



@Component({
    selector: 'app-create-user',
    templateUrl: 'user-create.component.html',
    styleUrls: [ 'user-create.component.css' ],
    providers: [ UserAuthService ]
})
export class UserCreateComponent implements OnInit {
    private newUserForm: FormGroup;
    private showError: boolean;
    private errorTitle: string;
    private errorMsg: string;

    constructor(private fb: FormBuilder, private auth: UserAuthService) {
        this.newUserForm = this.fb.group({
            fullname: [ '', [ Validators.maxLength(80), Validators.required ] ],
            email: [ '', [ Validators.email, Validators.required ] ],
            username: [ '', [ Validators.maxLength(40), Validators.required ] ],
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
        const [first, ...last] = name.split(' ');

        if (first.length > 40 || last.join(' ').length > 40) {
            this.errorTitle = 'Oops: Name Error';
            this.errorMsg = 'The first and last name needs to be less than 40 characters';
            this.showError = true;
            return;
        }

        const newUser: User = {
            firstname: first,
            lastname: last.join(' '),
            username: this.newUserForm.get('username').value,
            password: this.newUserForm.get('password').value,
            email: this.newUserForm.get('email').value
        };

        // TODO: handle routing
        this.auth.newUser(newUser).subscribe(
            (resp: AuthResponse) => {
                console.log('all done');
                console.log(resp);
            },
            (err) => {
                console.log('error');
                console.log(err);
            }
        );
    }
}
