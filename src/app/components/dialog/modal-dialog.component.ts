import { Component, Injectable, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { UserPostService } from '../../services/user-post.service';
import { UserFollowService } from '../../services/user-follow.service';
import { ProcessImage } from '../../util/imageprocess';
import { Observable } from 'rxjs/Observable';



interface UserSearch {
    username: string;
    avatar: string;
}

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
            position: { left: '25%', top: '50px' },
            data: {
                message: post || ''
            }
        });

        return dialogRef.afterClosed();
    }

    showDeleteDialog(title: string, message: string): Observable<any> {
        let dialogRef: MdDialogRef<DeleteDialogTemplateComponent>;

        dialogRef = this.dialog.open(DeleteDialogTemplateComponent, {
            disableClose: true,
            width: '400px',
            data: {
                title: title,
                message: message
            }
        });

        return dialogRef.afterClosed();
    }

    showUserSearchDialog(): Observable<any> {
        let dialogRef: MdDialogRef<SearchUserDialogTemplateComponent>;

        dialogRef = this.dialog.open(SearchUserDialogTemplateComponent, {
            disableClose: false,
            width: '400px',
            position: { top: '50px' }
        });

        return dialogRef.afterClosed();
    }

    showReportDialog(): Observable<any> {
        let dialogRef: MdDialogRef<ReportDialogTemplateComponent>;

        dialogRef = this.dialog.open(ReportDialogTemplateComponent, {
            width: '600px',
            position: { left: '25%', top: '50px' }
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
    constructor( @Inject(MD_DIALOG_DATA) private data: any, private dialogRef: MdDialogRef<ErrorDialogTemplateComponent>) {
    }
}


@Component({
    selector: 'app-report-dialog',
    templateUrl: 'report-dialog.component.html',
    styleUrls: ['report-dialog.component.css']
})
export class ReportDialogTemplateComponent {
    private reason: string;


    constructor( @Inject(MD_DIALOG_DATA) private data: any, private dialogRef: MdDialogRef<ErrorDialogTemplateComponent>) {
    }

    submitReport() {
        this.dialogRef.close(this.reason);
    }
}


@Component({
    selector: 'app-usersearch-dialog',
    templateUrl: 'usersearch-dialog.component.html',
    styleUrls: ['usersearch-dialog.component.css']
})
export class SearchUserDialogTemplateComponent {
    private username: string;
    private userList: UserSearch[];


    constructor( @Inject(MD_DIALOG_DATA) private data: any,
                private dialogRef: MdDialogRef<SearchUserDialogTemplateComponent>,
                private userFollow: UserFollowService) {
        this.username = '';
        this.userList = [];
    }

    search() {
        if (this.username.length > 1) {
            this.userFollow.searchForUser(this.username).subscribe(
                (resp) => {
                    if (this.userList.length > 0) {
                        this.userList = [];
                    }

                    for (const user of resp.users) {
                        this.userList.push(user);
                    }
                },
                (err) => {
                    this.userList = [];
                    this.userList.push({
                        username: 'Sorry, no users were found',
                        avatar: 'assets/cloud-error.png'
                    });
                }
            );

            this.username = '';
        }
    }

    userSelect(user: UserSearch) {
        this.dialogRef.close(user.username);
    }
}


@Component({
    selector: 'app-info-dialog',
    templateUrl: 'info-dialog.component.html',
    styleUrls: ['info-dialog.component.css']
})
export class DeleteDialogTemplateComponent {
    private title: string;
    private message: string;
    private showPassword: boolean;
    private password: string;


    constructor( @Inject(MD_DIALOG_DATA) private data: any,
                private dialogRef: MdDialogRef<DeleteDialogTemplateComponent>) {
        this.title = data.title;
        this.message = data.message;
        this.showPassword = false;
    }

    deletePress(value: boolean) {
        if (!this.showPassword) {
            this.showPassword = value;
            this.message = 'Your password is required to delete your account';

        } else {
            this.dialogRef.close(this.password);
        }
    }

    cancelPress(value: boolean) {
        this.dialogRef.close(undefined);
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


    constructor( @Inject(MD_DIALOG_DATA) private data: any,
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
