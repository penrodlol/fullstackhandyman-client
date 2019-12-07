import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../../external/style/material/material.module';
import { DialogService } from './dialog/dialog.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from './snackbar/snackbar.service';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
    declarations: [
        DialogComponent,
        SnackbarComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        BrowserModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [
        DialogService,
        SnackbarService
    ],
    entryComponents: [
        DialogComponent,
        SnackbarComponent
    ]
})
export class SharedModule {}
