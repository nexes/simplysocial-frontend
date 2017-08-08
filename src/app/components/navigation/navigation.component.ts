import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../services/navbar.service';


@Component({
    selector: 'app-nav',
    templateUrl: 'navigation.component.html',
    styleUrls: [ 'navigation.component.css' ]
})
export class NavigationComponent implements OnInit {

    constructor(private navBar: NavBarService) {
        console.log('navigation cstr()');
    }

    ngOnInit() {
        console.log('navigation oninit()');
    }
}
