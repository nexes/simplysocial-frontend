import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { NavBarService } from '../../services/navbar.service';


@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.css']
})
export class SettingsComponent {
    private userAbout: string;
    private userEmail: string;
    private userNewPass: string;
    private userVerifyPass: string;
    private userProfile: string;


    constructor(private userData: UserDataService, private navBar: NavBarService) {
        console.log('settings cstr()');
        this.navBar.showUserNavBar();

        this.userNewPass = '';
        this.userVerifyPass = '';
        this.userProfile = 'assets/usericon.png';
        this.userAbout = 'I like turtles!!!';
        this.userEmail = 'me@gmail.com';
    }

    updateProfilePic() {
        console.log('update');
    }
}
