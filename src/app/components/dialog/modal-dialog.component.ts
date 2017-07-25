import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
    selector: 'app-popup',
    templateUrl: 'modal-dialog.component.html',
    styleUrls: ['modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() title: string;
    @Input() message: string;


    constructor() {
        this.title = 'empty';
        this.message = 'empty';
    }

    ngOnInit() {
    }

    closeDialog() {
        this.toggle.emit(true);
    }
}
