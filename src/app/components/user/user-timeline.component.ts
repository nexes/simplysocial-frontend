import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { UserAuthenticationService } from '../../services/user-auth.service';
import { NavBarService } from '../../services/navbar.service';
import { UserPostService, Post } from '../../services/user-post.service';
import { UserFollowService } from '../../services/user-follow.service';
import { ModalDialogService } from '../../components/dialog/modal-dialog.component';
import { ProcessImage } from '../../util/imageprocess';



@Component({
    selector: 'app-timeline',
    templateUrl: 'user-timeline.component.html',
    styleUrls: ['user-timeline.component.css']
})
export class TimelineComponent implements OnInit {
    private postImageData: string;
    private postMessage: string;
    private currentUsername: string;
    private currentUserAvatar: string;
    private showLoadingBar: boolean;
    private hideImgPreview: boolean;
    private postList: Post[];
    private images: ProcessImage;


    constructor(private userPost: UserPostService,
                private userData: UserDataService,
                private userFollowers: UserFollowService,
                private userService: UserAuthenticationService,
                private dialog: ModalDialogService,
                private navBar: NavBarService) {
        this.navBar.showUserNavBar();
        this.showLoadingBar = true;
        this.hideImgPreview = true;
        this.images = new ProcessImage();
        this.postMessage = '';

        // populate the uses timeline with their posts. This is getting called once - should it be a service?
        this.userPost.getUserPosts().subscribe((post: Post) => {
            this.postList = post[ 'posts' ];
            this.showLoadingBar = false;
        });
    }

    ngOnInit() {
        this.currentUserAvatar = this.userData.avatar;
        this.currentUsername = this.userData.username;
    }

    openPostDialog() {
        this.dialog.showNewPostDialog(this.postMessage).subscribe(
            (resp) => {
                if (resp) {
                    this.postList.unshift(resp['post']);
                }
            }
        );
    }

    submitNewPost() {
        this.userPost.createPost(this.postMessage, this.postImageData).subscribe(
            (resp) => {
                this.postList.unshift(resp[ 'post' ]);
            },
            (err) => {
                console.log(err);
            }
        );

        this.postImageData = undefined;
        this.hideImgPreview = true;
        this.postMessage = '';
    }

    postImageUpload(file: File) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            this.images.resizeImage(reader.result, 720, 720).subscribe(
                (resp: string) => {
                    this.postImageData = resp.substring(resp.indexOf('base64,') + 'base64,'.length);

                    // show a preview of the image
                    const img = <HTMLImageElement>document.getElementById('img-preview');
                    img.src = resp;
                    this.hideImgPreview = false;
                }
            );
        });
        reader.readAsDataURL(file);
    }

    removeImagePreview() {
        this.postImageData = undefined;
        this.hideImgPreview = true;
    }

    likePost(post: Post) {
        this.userPost.updateLikeCount(post).subscribe(
            (resp) => {
                post.likes = resp.likecount;
            }
        );
    }

    userSearch() {
        this.dialog.showUserSearchDialog().subscribe(
            (searchResp: string) => {
                console.log(searchResp);
            }
        );
    }
}
