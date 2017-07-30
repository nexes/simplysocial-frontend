import { Component } from '@angular/core';


@Component({
    selector: 'app-nav',
    templateUrl: 'navigation.component.html',
    styleUrls: [ 'navigation.component.css' ]
})
export class NavigationComponent {
    private showCreateUser: boolean;
    private showPasswordReset: boolean;

    constructor() {

    }

    selected(selected: string) {
        if (selected === 'user') {
            this.showCreateUser = true;
            this.showPasswordReset = false;

        } else if (selected === 'password') {
            this.showCreateUser = false;
            this.showPasswordReset = true;
        }
    }
}
