import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../../external/style/material/material.module';
import { DialogService } from './dialog/dialog.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

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
        DialogComponent
    ]
})
export class SharedModule {}
