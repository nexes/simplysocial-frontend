import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { UserAuthenticationService } from '../../services/user-auth.service';
import { NavBarService } from '../../services/navbar.service';
import { UserPostService, Post } from '../../services/user-post.service';
import { UserFollowService, FollowUser } from '../../services/user-follow.service';
import { ModalDialogService } from '../../components/dialog/modal-dialog.component';
import { ProcessImage } from '../../util/imageprocess';



@Component({
    selector: 'app-timeline',
    templateUrl: 'user-timeline.component.html',
    styleUrls: [ 'user-timeline.component.css' ]
})
export class TimelineComponent implements OnInit {
    private postImageData: string;
    private postMessage: string;
    private currentUsername: string;
    private currentUserAvatar: string;
    private showLoadingBar: boolean;
    private hideImgPreview: boolean;
    private followList: FollowUser[];
    private postList: Post[];
    private images: ProcessImage;


    constructor(private userPost: UserPostService,
                private userData: UserDataService,
                private userFollowers: UserFollowService,
                private userService: UserAuthenticationService,
                private dialog: ModalDialogService,
                private snackBar: MdSnackBar,
                private navBar: NavBarService) {
        this.navBar.showUserNavBar();
        this.showLoadingBar = true;
        this.hideImgPreview = true;
        this.images = new ProcessImage();
        this.postMessage = '';

        // populate the users timeline with their posts. This is getting called once - should it be a service?
        this.userPost.getUserPosts().subscribe((post: Post) => {
            this.postList = post[ 'posts' ];
            this.showLoadingBar = false;
        });

        // populate the users following users
        this.userFollowers.followList().subscribe((followers: FollowUser) => {
            this.followList = followers[ 'following' ];
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
                    const newPost = resp[ 'post' ];
                    this.postList.unshift(resp[ 'post' ]);
                }
            }
        );
    }

    submitNewPost() {
        this.userPost.createPost(this.postMessage, this.postImageData).subscribe(
            (resp) => {
                const newPost = resp[ 'post' ];
                this.postList.unshift(newPost);
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
                if (searchResp === undefined || searchResp === this.userData.username) {
                    // can't follow yourself
                    return;
                }

                this.userFollowers.followUser(searchResp).subscribe(
                    (resp) => {
                        this.followList.push({
                            avatar: resp.followavatar,
                            username: resp.followname
                        });
                        this.userData.updateUser({ following: resp.followercount });
                        this.snackBar.open(`following ${resp.followname}`, 'dismiss', { duration: 3000 });
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }
        );
    }

    followingUserSelect(username: string) {
        console.log('follower clicked');
    }
}
