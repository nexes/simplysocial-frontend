import { Component, EventEmitter, Output } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { UserPostService, Post } from '../../services/user-post.service';



@Component({
    selector: 'app-userpost',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.css']
})
export class PostComponent {
    private postList: Post[];

    @Output()
    private loadingPost: EventEmitter<boolean>;


    constructor(private userData: UserDataService, private userPost: UserPostService) {
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
}
