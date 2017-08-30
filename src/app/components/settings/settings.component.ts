import { Component } from '@angular/core';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { NavBarService } from '../../services/navbar.service';
import { ProcessImage } from '../../util/imageprocess';


@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.css']
})
export class SettingsComponent {
    private imageProcess: ProcessImage;
    private userDescription: string;
    private userEmail: string;
    private userAvatar: string;
    private userFullName: string;


    // get user info that can be changed in settings. and first/last name
    constructor(private userData: UserDataService, private navBar: NavBarService) {
        console.log('settings cstr()');
        this.imageProcess = new ProcessImage();
        this.navBar.showUserNavBar();

        this.userAvatar = this.userData.avatar || 'assets/usericon.png';
        this.userDescription = this.userData.description || '';
        this.userEmail = this.userData.email || '';
        this.userFullName = this.userData.name || '';
    }

    updateProfilePic(avatarImg: File) {
        console.log(avatarImg);
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            this.imageProcess.resizeImage(reader.result, 84, 84).subscribe((result) => {
                this.userAvatar = result;
            });
        });

        reader.readAsDataURL(avatarImg);
    }

    sendChanges() {
        console.log('sendChanges()');
        this.userData.updateUser({
            avatar: this.userAvatar,
            email: this.userEmail,
            description: this.userDescription
        });
    }
}
