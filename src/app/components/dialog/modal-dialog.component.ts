import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';


@Injectable()
export class ModalDialogService {
    private dialogRef: MdDialogRef<ErrorDialogTemplateComponent>;

    constructor(private dialog: MdDialog) {
    }

    show(title: string, message: string) {
        this.dialogRef = this.dialog.open(ErrorDialogTemplateComponent);
        this.dialogRef.afterClosed().subscribe(resp => {
            console.log('after dialog closed');
            console.log(resp);
        });
    }

    closeDialog() {
    }
}


@Component({
    selector: 'app-error-template-dialog',
    template: `
        <h2>hello</h2>
    `
})
export class ErrorDialogTemplateComponent {
    constructor(private dialogRef: MdDialogRef<ErrorDialogTemplateComponent>) {

    }
}
