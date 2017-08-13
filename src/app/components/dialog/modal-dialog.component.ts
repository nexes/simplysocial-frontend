import { Component, Injectable, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Injectable()
export class ModalDialogService {

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

    showNewPostDialog(post?: string) {
        let dialogRef: MdDialogRef<PostDialogTemplateComponent>;

        dialogRef = this.dialog.open(PostDialogTemplateComponent, {
            disableClose: false,
            width: '60%',
            position: {left: '25%', top: '0px'},
            data: {
                message: post || ''
            }
        });
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

@Component({
    selector: 'app-post-dialog',
    templateUrl: 'post-dialog.component.html',
    styleUrls: ['post-dialog.component.css']
})
export class PostDialogTemplateComponent {
    private postMessage: string;

    constructor( @Inject(MD_DIALOG_DATA) private data: any, private dialogRef: MdDialogRef<PostDialogTemplateComponent>) {
        this.postMessage = data.message;
    }

    selectImage() {
        console.log('image upload');
    }
}
