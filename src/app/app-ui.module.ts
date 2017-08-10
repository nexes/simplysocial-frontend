import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
    MdMenuModule,
    MdGridListModule,
    MdInputModule,
    MdCheckboxModule,
    MdSlideToggleModule,
    MdDialogModule,
    MdListModule,
    MdCardModule,
    MdProgressBarModule,
    MdTabsModule,
    MdSnackBarModule
} from '@angular/material';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdMenuModule,
        MdGridListModule,
        MdInputModule,
        MdCheckboxModule,
        MdSlideToggleModule,
        MdDialogModule,
        MdListModule,
        MdCardModule,
        MdProgressBarModule,
        MdTabsModule,
        MdSnackBarModule
    ],
    exports: [
        BrowserAnimationsModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdMenuModule,
        MdGridListModule,
        MdInputModule,
        MdCheckboxModule,
        MdSlideToggleModule,
        MdDialogModule,
        MdListModule,
        MdCardModule,
        MdProgressBarModule,
        MdTabsModule,
        MdSnackBarModule
    ]
})
export class AppMaterialComponentModule { }
