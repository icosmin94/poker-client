import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page/login-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../shared/material.module';

const routes: Routes = [
  {
    path: '', component: LoginPageComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    MaterialModule
  ]
})
export class LoginModule { }
