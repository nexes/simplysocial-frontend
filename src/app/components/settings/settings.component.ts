import { Component } from '@angular/core';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { UserAuthenticationService } from '../../services/user-auth.service';
import { ModalDialogService } from '../dialog/modal-dialog.component';
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
    constructor(private userData: UserDataService,
                private userAuth: UserAuthenticationService,
                private navBar: NavBarService,
                private dialog: ModalDialogService) {
        console.log('settings cstr()');
        this.imageProcess = new ProcessImage();
        this.navBar.showUserNavBar();

        this.userAvatar = this.userData.avatar || 'assets/usericon.png';
        this.userDescription = this.userData.description || '';
        this.userEmail = this.userData.email || '';
        this.userFullName = this.userData.name || '';
    }

    updateProfilePic(avatarImg: File) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            this.imageProcess.resizeImage(reader.result, 84, 84).subscribe((result) => {
                this.userAvatar = result;
            });
        });

        reader.readAsDataURL(avatarImg);
    }

    sendChanges() {
        if (this.userEmail !== this.userData.email) {
            this.userAuth.userEmail(this.userData.userID, this.userEmail, true).subscribe(
                (resp: CurrentUser) => {
                    this.userData.updateUser({ email: resp.email });
                }
            );
        }

        if (this.userDescription !== this.userData.description) {
            this.userAuth.userDescription(this.userData.userID, this.userDescription, true).subscribe(
                (resp: CurrentUser) => {
                    this.userData.updateUser({ description: resp.description });
                }
            );
        }

        if (this.userAvatar !== this.userData.avatar && this.userAvatar !== 'assets/usericon.png') {
            this.userAuth.userAvatar(this.userData.userID, this.userAvatar, true).subscribe(
                (resp: CurrentUser) => {
                    this.userData.updateUser({ avatar: resp.avatar });
                }
            );
        }
    }
}
