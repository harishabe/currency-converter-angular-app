import { Component, OnInit } from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import { SearchHistory } from 'src/app/shared/interfaces/search-history';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {
  dataSource: MatTableDataSource<SearchHistory>;
  displayedColumns: string[] = ['amount', 'baseCurrency','toCurrency','convertedAmount','date'];
  constructor() {
    this.dataSource = new MatTableDataSource(
      JSON.parse(localStorage.searchHistory)
    );
  }

  ngOnInit(): void {
  }

}
