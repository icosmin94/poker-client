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
import { TablesComponent } from './components/tables/tables.component';


const routes: Routes = [
  { path: '', component: MainComponent,
  children: [
    { path: 'tables', component: TablesComponent },
  ]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [MainContentComponent, SidenavComponent, MainComponent, ToolbarComponent, TablesComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    MaterialModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class MainModule { }
