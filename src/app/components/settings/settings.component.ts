import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
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
    private followerCount: number;
    private followingCount: number;
    private postCount: number;


    constructor(private userData: UserDataService,
                private userAuth: UserAuthenticationService,
                private navBar: NavBarService,
                private router: Router,
                private snackBar: MdSnackBar,
                private dialog: ModalDialogService) {
        this.imageProcess = new ProcessImage();
        this.navBar.showUserNavBar();

        this.userAvatar = this.userData.avatar;
        this.userDescription = this.userData.description;
        this.userEmail = this.userData.email;
        this.userFullName = this.userData.name;
        this.postCount = this.userData.posts;
        this.followerCount = this.userData.followerCount;
        this.followingCount = this.userData.followingCount;
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

    deleteAccount() {
        const title = 'Delete your account';
        const msg = `Are you sure you want to delete your account ${this.userData.name}`;

        this.dialog.showDeleteDialog(title, msg).subscribe((password: string) => {
            if (password) {
                this.userAuth.deleteUser(this.userData.username, password).subscribe(
                    (resp) => {
                        if (resp.message === 'success') {
                            this.snackBar.open('Account was removed', 'close', {duration: 3000});
                            this.router.navigate(['/']);
                        }
                    },
                    (err) => {
                        const errorMsg = err.error['message'];

                        if (errorMsg) {
                            this.snackBar.open(errorMsg, 'close', {duration: 3000});
                        } else {
                            this.snackBar.open('Account was not deleted', 'close', {duration: 3000});
                        }
                    }
                );

            } else {
                console.log('no password given');
            }
        });
    }

    sendChanges() {
        // I am not happy with this method, actually I really need to redo the whole settings thing.
        if (this.userEmail !== this.userData.email) {
            this.userAuth.userEmail(this.userData.userID, this.userEmail, true).subscribe(
                (resp: CurrentUser) => {
                    this.userData.updateUser({ email: resp.email });

                    if (this.userDescription === this.userData.description &&
                        this.userAvatar === this.userData.avatar) {
                        this.router.navigate([ '/', this.userData.username ]);
                    }
                }
            );
        }

        if (this.userDescription !== this.userData.description) {
            this.userAuth.userDescription(this.userData.userID, this.userDescription, true).subscribe(
                (resp: CurrentUser) => {
                    this.userData.updateUser({ description: resp.description });

                    if (this.userAvatar === this.userData.avatar) {
                        this.router.navigate([ '/', this.userData.username ]);
                    }
                }
            );
        }

        if (this.userAvatar !== this.userData.avatar && this.userAvatar !== 'assets/usericon.png') {
            this.userAuth.userAvatar(this.userData.userID, this.userAvatar, true).subscribe(
                (resp: CurrentUser) => {
                    this.userData.updateUser({ avatar: resp.avatar });
                    this.router.navigate([ '/', this.userData.username ]);
                }
            );
        }
    }
}
