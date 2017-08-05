import { Component, Injectable, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Injectable()
export class ModalDialogService {
    // private dialogRef: MdDialogRef<any>;

    constructor(private dialog: MdDialog) {
    }

    showErrorDialog(title: string, message: string) {
        let dialogRef: MdDialogRef<ErrorDialogTemplateComponent>;

        dialogRef = this.dialog.open(ErrorDialogTemplateComponent, {
            disableClose: true,
            width: '400px',
            data: {
                title: title,
                message: message
            }
        });
        // dialogRef.afterClosed().subscribe(resp => {
        // });
    }
}


@Component({
    selector: 'app-error-dialog',
    templateUrl: 'error-dialog.component.html',
    styleUrls: ['error-dialog.component.css']
})
export class ErrorDialogTemplateComponent {
    constructor(@Inject(MD_DIALOG_DATA) private data: any, private dialogRef: MdDialogRef<ErrorDialogTemplateComponent>) {
    }
}

@Component({
    selector: 'app-info-dialog',
    templateUrl: 'info-dialog.component.html'
})
export class InfoDialogTemplateComponent {
    constructor(@Inject(MD_DIALOG_DATA) private data: any, private dialogRef: MdDialogRef<InfoDialogTemplateComponent>) {
    }
}
