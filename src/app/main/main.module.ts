import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainContentComponent} from './main-content/main-content.component';
import {RouterModule, Routes} from '@angular/router';


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
  ]
})
export class MainModule { }
