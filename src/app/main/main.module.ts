import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainContentComponent} from './main-content/main-content.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../shared/material.module';


const routes: Routes = [
  {
    path: '', component: MainContentComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [MainContentComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    MaterialModule
  ]
})
export class MainModule { }
