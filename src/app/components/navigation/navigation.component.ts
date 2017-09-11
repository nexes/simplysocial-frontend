import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NavBarService } from '../../services/navbar.service';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { UserAuthenticationService } from '../../services/user-auth.service';


@Component({
    selector: 'app-nav',
    templateUrl: 'navigation.component.html',
    styleUrls: [ 'navigation.component.css' ]
})
export class NavigationComponent implements OnInit {
    private activeNotifications: boolean;
    private currentUsername: string;


    constructor(private navBar: NavBarService,
                private userData: UserDataService,
                private snackBar: MdSnackBar,
                private router: Router,
                private userAuth: UserAuthenticationService) {
        this.activeNotifications = false;
        this.currentUsername = this.userData.username;
    }

    ngOnInit() {
        this.userData.listen().subscribe(
            (resp: CurrentUser) => {
                this.currentUsername = resp.username;
            }
        );
        this.currentUsername = this.userData.username;
    }

    logoutUser() {
        this.userAuth.logoff(this.userData.userID).subscribe((resp) => {
            this.userData.clearUser();
            this.router.navigateByUrl('/');
            this.snackBar.open('You have been logged off', 'dismiss', {duration: 2000});
        });
    }
}
