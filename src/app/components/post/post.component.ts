import { Component, EventEmitter, Output } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { UserDataService } from '../../services/user-data.service';
import { UserPostService, Post } from '../../services/user-post.service';
import { ModalDialogService } from '../../components/dialog/modal-dialog.component';



@Component({
    selector: 'app-userpost',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.css']
})
export class PostComponent {
    private postList: Post[];
    private commentMessage: string;

    @Output()
    private loadingPost: EventEmitter<boolean>;


    constructor(private userData: UserDataService,
                private userPost: UserPostService,
                private snackBar: MdSnackBar,
                private dialog: ModalDialogService) {
        this.commentMessage = '';
        this.loadingPost = new EventEmitter<boolean>();

        this.userPost.getUserPosts().subscribe(
            (post) => {
                this.postList = post[ 'posts' ];
                this.loadingPost.emit(true);
            }
        );
    }

    submitNewPost(postMessage, postImage) {
        this.userPost.createPost(postMessage, postImage).subscribe(
            (resp) => {
                const newPost = resp[ 'post' ];
                this.postList.unshift(newPost);
                this.userData.updateUser({ postcount: this.userData.posts + 1 });
            },
            (err) => {
                console.log(err);
            }
        );
    }

    updatePostList(post: Post) {
        this.postList.unshift(post);
    }

    likePost(post: Post) {
        this.userPost.updateLikeCount(post).subscribe(
            (resp) => {
                post.likes = resp.likecount;
            }
        );
    }

    submitComment(post: Post) {
        this.userPost.commentOnPost(post, this.commentMessage).subscribe(
            (resp) => {
                // we're going to fake it right now
                post.comments.unshift({
                    author: this.userData.username,
                    message: this.commentMessage,
                    date: Date.now().toString()
                });
                this.commentMessage = '';
            }
        );
    }

    reportPost(post: Post) {
        this.dialog.showReportDialog().subscribe(
            (resp) => {
                if (resp !== undefined && resp.length > 2) {
                    this.userPost.reportPost(post.postid, resp, this.userData.email).subscribe(
                        (balh) => {
                            this.snackBar.open('Post reported', 'dismiss', { duration: 3000});
                        }
                    );
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
