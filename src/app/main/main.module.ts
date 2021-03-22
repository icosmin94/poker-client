import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainContentComponent} from './components/main-content/main-content.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../shared/material.module';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {MainComponent} from './components/main.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {TablesComponent} from './components/tables/tables.component';
import {TableComponent} from './components/table/table.component';


const routes: Routes = [
  { path: '', component: MainComponent,
  children: [
    { path: 'tables/:id', component: TableComponent },
    { path: 'tables', component: TablesComponent },
  ]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [MainContentComponent, SidenavComponent, MainComponent, ToolbarComponent, TablesComponent, TableComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    MaterialModule,
    MatSidenavModule
  ]
})
export class MainModule { }
