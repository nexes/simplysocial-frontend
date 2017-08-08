import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService, CurrentUser } from '../../services/user-data.service';
import { NavBarService } from '../../services/navbar.service';


@Component({
    selector: 'app-timeline',
    templateUrl: 'user-timeline.component.html',
    styleUrls: ['user-timeline.component.css']
})
export class TimelineComponent implements OnInit {
    private showLoadingBar: boolean;

    constructor(private userData: UserDataService, private navBar: NavBarService) {
        console.log('timeline cnst called');
        this.showLoadingBar = true;
        this.userData.listen().subscribe(this.userDataServiceSuccess, this.userDataServiceError);
        this.navBar.showUserNavBar();
    }

    ngOnInit() {
        console.log('timeline ngOnInit called');
        this.showLoadingBar = false;
    }

    userDataServiceSuccess(resp: CurrentUser) {
        console.log('timeline: user data change was observed');
        console.log(resp);

        this.showLoadingBar = false;
    }

    userDataServiceError(err: Error) {
        console.log(err);
    }

    followingClick(selected: string) {
        console.log(`follower ${selected}`);
    }
}
