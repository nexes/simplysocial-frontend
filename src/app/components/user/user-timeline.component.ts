import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService, CurrentUser } from '../../services/user-data.service';


@Component({
    selector: 'app-timeline',
    templateUrl: 'user-timeline.component.html',
    styleUrls: ['user-timeline.component.css']
})
export class TimelineComponent implements OnInit {
    private showLoadingBar: boolean;

    constructor(private userData: UserDataService) {
        console.log('cnst called');
        this.showLoadingBar = true;
        this.userData.listen().subscribe(this.userDataServiceSuccess, this.userDataServiceError);
    }

    ngOnInit() {
        console.log('ngOnInit called');
        this.showLoadingBar = false;
    }

    userDataServiceSuccess(resp: CurrentUser) {
        console.log('user data change was observed');
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
