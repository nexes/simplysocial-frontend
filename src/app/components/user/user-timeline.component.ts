import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService, CurrentUser } from '../../services/user-data.service';


@Component({
    selector: 'app-timeline',
    templateUrl: 'user-timeline.component.html',
    styleUrls: ['user-timeline.component.css']
})
export class TimelineComponent implements OnInit {
    constructor(private route: ActivatedRoute, private userData: UserDataService) {
        this.userData.listen().subscribe(this.userDataServiceSuccess, this.userDataServiceError);
    }

    ngOnInit() {

    }

    userDataServiceSuccess(resp: CurrentUser) {
        console.log(resp);
    }

    userDataServiceError(err: Error) {
        console.log(err);
    }

}
