import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserFollowService } from '../../services/user-follow.service';



@Component({
    selector: 'app-friend-timeline',
    templateUrl: 'friend-timeline.component.html',
    styleUrls: ['friend-timeline.component.css']
})
export class FriendTimelineComponent {
    private friendUsername: string;
    private friendPosts: JSON[];
    private friendAvatar: string;
    private friendAbout: string;
    private friendPostCount: number;
    private friendFollowingCount: number;
    private friendFollowerCount: number;


    constructor(private router: Router, private followService: UserFollowService) {
        this.friendUsername = router.url.substring(router.url.lastIndexOf('/') + 1);

        this.followService.getFriendTimeline(this.friendUsername).subscribe(
            (resp) => {
                console.log(resp);

                this.friendAvatar = resp['avatar'];
                this.friendAbout = resp['about'];
                this.friendPostCount = resp['postcount'];
                this.friendFollowerCount = resp['followers'];
                this.friendFollowingCount = resp['following'];
                this.friendPosts = resp['posts'];
            },
            (err) => {
                console.log('error friend timeline');
                console.log(err);
            }
        );
    }
}
