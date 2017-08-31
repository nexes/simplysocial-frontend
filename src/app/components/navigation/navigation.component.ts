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
    private currentUserAvatar: string;


    constructor(private navBar: NavBarService, private userData: UserDataService) {
        this.activeNotifications = false;

        this.userData.listen().subscribe(
            (resp: CurrentUser) => {
                console.log('navigation user change');
                this.currentUsername = resp.username;
                this.currentUserAvatar = resp.avatar || 'assets/usericon.png';
            }
        );
    }

    ngOnInit() {
        console.log('navigation oninit()');
        this.currentUserAvatar = this.userData.avatar || 'assets/usericon.png';
    }
}
