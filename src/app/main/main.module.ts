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
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';


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
    MatSidenavModule
  ]
})
export class MainModule { }
