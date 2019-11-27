import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../../external/style/material/material.module';
import { DialogService } from './dialog/dialog.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCookieContainerFormComponent } from '../cookies/create-cookie-container-form/create-cookie-container-form.component';

@NgModule({
    declarations: [
        DialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        BrowserModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [
        DialogService
    ],
    entryComponents: [
        DialogComponent,
        CreateCookieContainerFormComponent
    ]
})
export class SharedModule {}
