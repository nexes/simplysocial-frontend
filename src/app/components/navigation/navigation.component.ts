import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../services/navbar.service';


@Component({
    selector: 'app-nav',
    templateUrl: 'navigation.component.html',
    styleUrls: [ 'navigation.component.css' ]
})
export class NavigationComponent implements OnInit {
    private activeNotifications: boolean;

    constructor(private navBar: NavBarService) {
        console.log('navigation cstr()');
        this.activeNotifications = false;
    }

    ngOnInit() {
        console.log('navigation oninit()');
    }
}
