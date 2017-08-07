import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService, CurrentUser } from '../../services/user-data.service';


@Component({
    selector: 'app-nav',
    templateUrl: 'navigation.component.html',
    styleUrls: [ 'navigation.component.css' ]
})
export class NavigationComponent implements OnInit {
    private showUserData: boolean;

    constructor(private router: Router, private userData: UserDataService) {
        console.log('navigation cstr()');
        this.showUserData = false;

        this.userData.listen().subscribe(
            this.userDataUpdated,
            this.userDataError
        );
    }

    ngOnInit() {
        console.log('navigation oninit()');
    }

    userDataUpdated(user: CurrentUser) {
        console.log('navigation userDataUpdated ' + user);
        console.log(user);
        this.showUserData = true;
    }

    userDataError(err: Error) {
        console.log('userDataError' + err);
    }
}
