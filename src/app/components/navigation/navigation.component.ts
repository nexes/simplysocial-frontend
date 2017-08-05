import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-nav',
    templateUrl: 'navigation.component.html',
    styleUrls: [ 'navigation.component.css' ]
})
export class NavigationComponent {
    constructor(private router: Router) {

    }
}
