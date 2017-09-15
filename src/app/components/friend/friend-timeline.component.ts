import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { UserFollowService } from '../../services/user-follow.service';



@Component({
    selector: 'app-friend-timeline',
    templateUrl: 'friend-timeline.component.html',
    styleUrls: ['friend-timeline.component.css']
})
export class FriendTimelineComponent {
    private readonly friendUsername: string;
    private friendPosts: JSON[];
    private friendFollowing: JSON[];
    private friendAvatar: string;
    private friendAbout: string;
    private friendPostCount: number;
    private friendFollowingCount: number;
    private friendFollowerCount: number;


    constructor(private router: Router,
                private userData: UserDataService,
                private followService: UserFollowService) {
        this.friendUsername = router.url.substring(router.url.lastIndexOf('/') + 1);

        this.followService.getFriendTimeline(this.friendUsername).subscribe(
            (resp) => {
                this.friendAvatar = resp[ 'avatar' ];
                this.friendAbout = resp[ 'about' ];
                this.friendPostCount = resp[ 'postcount' ];
                this.friendFollowerCount = resp[ 'followers' ];
                this.friendFollowingCount = resp[ 'following' ];
                this.friendPosts = resp[ 'posts' ];
                this.friendFollowing = resp[ 'followinglist' ];
            },
            (err) => {
                console.log(err);
            }
        );
    }

    unfollowUser() {
        this.followService.unFollowUser(this.friendUsername).subscribe(
            (resp) => {
                this.userData.updateUser({ following: resp[ 'followercount' ] });
                this.router.navigateByUrl(`/${this.userData.username}`);
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
