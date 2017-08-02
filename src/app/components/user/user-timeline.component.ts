import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-timeline',
    templateUrl: 'user-timeline.component.html',
    styleUrls: ['user-timeline.component.css']
})
export class TimelineComponent {

    constructor(private route: ActivatedRoute) {
        console.log('timeline params');

        this.route.params.subscribe(
            data => {
                console.log(data);
            }
        );

        console.log('timeline data');
        this.route.data.subscribe(
            data => {
                console.log(data);
            }
        );

        console.log('timeline queryparams');
        this.route.queryParams.subscribe(
            data => {
                console.log(data);
            }
        );

        console.log('timeline paramMap');
        this.route.paramMap.subscribe(
            data => {
                console.log(data);
            }
        );
    }
}
