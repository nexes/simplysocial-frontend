import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-popup',
    templateUrl: 'error-dialog.component.html',
    styleUrls: ['error-dialog.component.css']
})
export class ErrorDialogComponent {
    @Output() toggle: EventEmitter<boolean>;
    @Input() title: string;
    @Input() message: string;

    constructor() {
        this.toggle = new EventEmitter<boolean>();
        this.title = '';
        this.message = '';
    }

    closeDialog() {
        this.title = '';
        this.message = '';
        this.toggle.emit(true);
    }
}
