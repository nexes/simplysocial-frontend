import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { NavBarService } from '../../services/navbar.service';
import { ModalDialogService } from '../../components/dialog/modal-dialog.component';


@Component({
    selector: 'app-timeline',
    templateUrl: 'user-timeline.component.html',
    styleUrls: ['user-timeline.component.css']
})
export class TimelineComponent implements OnInit {
    private showLoadingBar: boolean;
    private currentUser: CurrentUser;


    constructor(private userData: UserDataService, private dialog: ModalDialogService, private navBar: NavBarService) {
        console.log('timeline cnst called');
        this.showLoadingBar = true;
        this.navBar.showUserNavBar();
        this.userData.listen().subscribe(this.userDataServiceSuccess, this.userDataServiceError);
    }

    ngOnInit() {
        console.log('timeline ngOnInit called');
        this.showLoadingBar = false;
    }

    openPostDialog(message?: string) {
        this.dialog.showNewPostDialog(message);
    }

    userDataServiceSuccess(resp: CurrentUser) {
        console.log('timeline: user data change was observed');
        console.log(resp);

        this.showLoadingBar = false;
        this.currentUser = resp;
    }

    userDataServiceError(err: Error) {
        console.log(err);
    }

    followingClick(selected: string) {
        console.log(`follower ${selected}`);
    }

    postImageUpload() {
        console.log('upload image');
    }
}
