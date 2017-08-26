import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../services/navbar.service';
import { UserDataService, CurrentUser } from '../../services/user-data.service';


@Component({
    selector: 'app-nav',
    templateUrl: 'navigation.component.html',
    styleUrls: [ 'navigation.component.css' ]
})
export class NavigationComponent implements OnInit {
    private activeNotifications: boolean;
    private currentUsername: string;

    constructor(private navBar: NavBarService, private userData: UserDataService) {
        this.activeNotifications = false;

        userData.listen().subscribe(
            (resp: CurrentUser) => {
                this.currentUsername = resp.username;
            }
        );
    }

    ngOnInit() {
        console.log('navigation oninit()');
    }
}
