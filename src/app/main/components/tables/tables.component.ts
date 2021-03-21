import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PokerTableService} from '../../services/poker-table.service';
import {PokerTable} from '../../models/pokertable';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, AfterViewInit {

  pokerTables: PokerTable[] | undefined;
  errorMessage = '';
  dataSource: MatTableDataSource<PokerTable>;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }

  constructor(private pokerTableService: PokerTableService,) {

  }

  ngOnInit(): void {
    this.pokerTableService.getPokerTables().subscribe({
      next: pokerTables => {
        this.pokerTables = pokerTables;
        this.dataSource = new MatTableDataSource<PokerTable>(this.pokerTables);
      },
      error: err => this.errorMessage = err
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
