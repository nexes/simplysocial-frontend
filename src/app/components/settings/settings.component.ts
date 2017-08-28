import { Component } from '@angular/core';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { NavBarService } from '../../services/navbar.service';


@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.css']
})
export class SettingsComponent {
    private userDescription: string;
    private userEmail: string;
    private userAvatar: string;
    private userFullName: string;


    // get user info that can be changed in settings. and first/last name
    constructor(private userData: UserDataService, private navBar: NavBarService) {
        console.log('settings cstr()');
        this.navBar.showUserNavBar();

        this.userAvatar = this.userData.avatar || 'assets/usericon.png';
        this.userDescription = this.userData.description;
        this.userEmail = this.userData.email;
        this.userFullName = this.userData.name;
    }

    updateProfilePic() {
        console.log('update');
    }
}
