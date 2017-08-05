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
    MdDialogModule
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
        MdDialogModule
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
        MdDialogModule
    ]
})
export class AppMaterialComponentModule { }
