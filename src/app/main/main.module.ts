import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainContentComponent} from './components/main-content/main-content.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../shared/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainComponent } from './components/main.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


const routes: Routes = [
  {
    path: '', component: MainComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [MainContentComponent, SidenavComponent, MainComponent, ToolbarComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    MaterialModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class MainModule { }
