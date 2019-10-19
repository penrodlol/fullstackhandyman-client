import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpComponent } from './http/http.component';
import { Routes, RouterModule } from '@angular/router';

const httpRoutes: Routes = [
  { path: '', component: HttpComponent }
];

@NgModule({
  declarations: [HttpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(httpRoutes)
  ]
})
export class HttpModule { }
