import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-nav',
    templateUrl: 'navigation.component.html',
    styleUrls: [ 'navigation.component.css' ]
})
export class NavigationComponent {
    private showCreateUser: boolean;
    private showPasswordReset: boolean;
    private showIcon: boolean;

    constructor(private router: Router) {

    }

    selected(selected: string) {
        if (this.router.url === '/newuser') {
            this.showCreateUser = true;
            this.showPasswordReset = false;
            this.showIcon = true;

        } else if (this.router.url === '/resetpassword') {
            this.showCreateUser = false;
            this.showPasswordReset = true;
            this.showIcon = true;
        }
    }
}
