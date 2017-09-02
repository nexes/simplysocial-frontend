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
        this.currentUsername = this.userData.username;
    }

    ngOnInit() {
        console.log('navigation oninit()');

        this.userData.listen().subscribe(
            (resp: CurrentUser) => {
                console.log('navigation user change');
                this.currentUsername = resp.username;
            }
        );
        this.currentUsername = this.userData.username;
    }
}
