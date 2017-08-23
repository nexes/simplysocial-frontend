import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { NavBarService } from '../../services/navbar.service';
import { UserPostService, Post } from '../../services/user-post.service';
import { ModalDialogService } from '../../components/dialog/modal-dialog.component';
import { ProcessImage } from '../../util/imageprocess';


@Component({
    selector: 'app-timeline',
    templateUrl: 'user-timeline.component.html',
    styleUrls: ['user-timeline.component.css']
})
export class TimelineComponent implements OnInit {
    private showLoadingBar: boolean;
    private currentUsername: string;
    private postImageData: string;
    private hideImgPreview: boolean;
    private postList: Post[];
    private images: ProcessImage;


    constructor(private userPost: UserPostService,
                private userData: UserDataService,
                private dialog: ModalDialogService,
                private navBar: NavBarService) {
        this.showLoadingBar = true;
        this.hideImgPreview = true;
        this.navBar.showUserNavBar();
        this.currentUsername = this.userData.getCurrentUsername();
        this.images = new ProcessImage();

        this.userData.listen().subscribe((user: CurrentUser) => {
            console.log(user);
        });

        this.userPost.getUserPosts().subscribe((post: Post) => {
            this.postList = post[ 'posts' ];
            this.showLoadingBar = false;
        });
    }

    ngOnInit() {
    }

    openPostDialog(message?: string) {
        this.dialog.showNewPostDialog(message);
    }

    submitNewPost(postMessage: string) {
        this.userPost.createPost(postMessage, this.postImageData).subscribe(
            (resp) => {
                console.log(resp['post']);
                this.postList.unshift(resp['post']);
            },
            (err) => {
                console.log(err);
            }
        );

        this.postImageData = undefined;
        this.hideImgPreview = true;
        postMessage = '';
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

    followingClick(selected: string) {
        console.log(`follower ${selected}`);
    }
}
