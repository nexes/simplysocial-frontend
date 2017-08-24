import { Component, Injectable, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { UserPostService } from '../../services/user-post.service';
import { ProcessImage } from '../../util/imageprocess';
import { Observable } from 'rxjs/Observable';


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
    }

    showNewPostDialog(post?: string): Observable<any> {
        let dialogRef: MdDialogRef<PostDialogTemplateComponent>;

        dialogRef = this.dialog.open(PostDialogTemplateComponent, {
            disableClose: false,
            width: '60%',
            position: {left: '25%', top: '0px'},
            data: {
                message: post || ''
            }
        });

        return dialogRef.afterClosed();
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
    private image: ProcessImage;
    private postMessage: string;
    private postImageData: string;
    private showImgPreview: boolean;


    constructor(@Inject(MD_DIALOG_DATA) private data: any,
                private dialogRef: MdDialogRef<PostDialogTemplateComponent>,
                private userPost: UserPostService) {
        this.image = new ProcessImage();
        this.postMessage = data.message || '';
        this.showImgPreview = false;
    }

    selectImage(imageFile: File) {
        const filereader = new FileReader();

        filereader.addEventListener('load', () => {
            this.image.resizeImage(filereader.result, 720, 720).subscribe(
                (resp: string) => {
                    this.postImageData = resp.substring(resp.indexOf('base64,') + 'base64,'.length);

                    // show image preview
                    const imgElem = <HTMLImageElement>document.getElementById('img-preview');
                    imgElem.src = resp;
                    console.log(imgElem);
                    this.showImgPreview = true;
                }
            );
        });

        filereader.readAsDataURL(imageFile);
    }

    sendPost() {
        this.showImgPreview = false;

        this.userPost.createPost(this.postMessage, this.postImageData).subscribe(
            (resp) => {
                this.dialogRef.close(resp);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    removeImagePreview() {
        const imgElem = <HTMLImageElement>document.getElementById('img-preview');
        imgElem.src = '';

        this.postImageData = undefined;
        this.showImgPreview = false;
    }
}
