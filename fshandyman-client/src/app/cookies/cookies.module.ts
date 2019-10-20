import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiesComponent } from './cookies/cookies.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/external/style/material/material.module';
import { BuilderComponent } from './builder/builder.component';
import { OutputComponent } from './output/output.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieTableComponent } from './builder/cookie-table/cookie-table.component';

const cookieRoutes: Routes = [
  { path: '', component: CookiesComponent }
];
//test
@NgModule({
  declarations: [CookiesComponent, BuilderComponent, OutputComponent, CookieTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(cookieRoutes),
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CookiesModule { }
