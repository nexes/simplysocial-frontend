import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { NavBarService } from '../../services/navbar.service';
import { UserPostService } from '../../services/user-post.service';
import { ModalDialogService } from '../../components/dialog/modal-dialog.component';


@Component({
    selector: 'app-timeline',
    templateUrl: 'user-timeline.component.html',
    styleUrls: ['user-timeline.component.css']
})
export class TimelineComponent implements OnInit {
    private showLoadingBar: boolean;
    private currentUser: CurrentUser;
    private imageData: string;

    constructor(private userPost: UserPostService,
                private userData: UserDataService,
                private dialog: ModalDialogService,
                private navBar: NavBarService) {
        this.showLoadingBar = true;
        this.navBar.showUserNavBar();
        this.userData.listen().subscribe(this.userDataServiceSuccess, this.userDataServiceError);
    }

    ngOnInit() {
        this.showLoadingBar = false;
    }

    openPostDialog(message?: string) {
        this.dialog.showNewPostDialog(message);
    }

    submitNewPost(postMessage: string) {
        this.userPost.createPost(postMessage, this.imageData).subscribe(
            (resp) => {
                console.log('response');
                console.log(resp['post']);
            }
        );
    }

    postImageUpload(file) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            const imgString: string = reader.result;
            this.imageData = imgString.substring(imgString.indexOf('base64,') + 'base64,'.length);
        });
        reader.readAsDataURL(file);
    }

    userDataServiceSuccess(resp: CurrentUser) {
        this.showLoadingBar = false;
        this.currentUser = resp;
    }

    userDataServiceError(err: Error) {
        console.log(err);
    }

    followingClick(selected: string) {
        console.log(`follower ${selected}`);
    }
}
