import { Component, Input, OnInit } from '@angular/core';
import { Beer } from 'src/app/shared/models/beer';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input()
  filteredBeers: Beer[] | null;
  @Input()
  tableHeader: string[];

  constructor() {}

  ngOnInit(): void {}
}
