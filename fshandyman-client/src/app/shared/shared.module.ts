import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../../external/style/material/material.module';
import { DialogService } from './dialog/dialog.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogFormComponent } from './dialog/dialog-form/dialog-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DialogComponent,
        DialogFormComponent
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
        DialogComponent
    ]
})
export class SharedModule {}
