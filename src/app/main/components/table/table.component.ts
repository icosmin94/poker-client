import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  public id: number;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.id = id;
    });
  }

}
