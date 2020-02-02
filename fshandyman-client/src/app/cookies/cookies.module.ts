import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/external/style/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CookiesComponent } from './cookies.component';
import { CookieContainersComponent } from './cookie-containers/cookie-containers.component';
import { CreateCookieContainerComponent } from './cookie-containers/create-cookie-container/create-cookie-container.component';

const cookieRoutes: Routes = [
  { path: '', component: CookiesComponent }
];

@NgModule({
  declarations: [CookiesComponent, CookieContainersComponent, CreateCookieContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(cookieRoutes),
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [CreateCookieContainerComponent]
})
export class CookiesModule { }
