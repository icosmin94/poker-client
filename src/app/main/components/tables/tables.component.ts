import {Component, OnInit} from '@angular/core';
import {PokerTableService} from '../../services/poker-table.service';
import {PokerTable} from '../../models/pokertable';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  pokerTables: PokerTable[] | undefined;
  errorMessage = '';

  constructor(private pokerTableService: PokerTableService) { }

  ngOnInit(): void {
    this.pokerTableService.getPokerTables().subscribe({
      next: pokerTables => this.pokerTables = pokerTables,
      error: err => this.errorMessage = err
    });
  }

}
