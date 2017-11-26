import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { DateService } from '../services/date.service';

import { Ledger } from '../shared/ledger';

@Component({
  selector: 'app-table-ledger',
  templateUrl: './table-ledger.component.html',
  styleUrls: ['./table-ledger.component.scss']
})
export class TableLedgerComponent implements AfterViewInit   {


  startDate = new FormControl(this.dateservice.firstDayMonth);
  endDate = new FormControl(this.dateservice.todayDate);
  displayedColumns = ['date', 'credit', 'debit', 'store', 'category'];


  dataSource = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private dateservice: DateService) {}

  ngAfterViewInit() {

     // If the user changes the sort order, reset back to the first page.
     this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;

    this.http.get<LedgerEntries[]>('http://localhost:5000/ledger-entries/2017-01-01/2020-01-01')
    .map(data => {
      this.resultsLength = 30;
      this.paginator.pageSize = 10;
      return data;
    })
    .subscribe(data => {
     this.dataSource.data = data;
   });
 }

}
export interface LedgerEntries {
  ledger: Ledger
}



     // Observable.merge(this.sort.sortChange, this.paginator.page)
     //     .startWith(null)
     //     .switchMap(() => {
     //       this.isLoadingResults = true;
     //       return this.exampleDatabase!.getRepoIssues(
     //           this.sort.active, this.sort.direction, this.paginator.pageIndex);
     //     })
     //     .map(data => {
     //       // Flip flag to show that loading has finished.
     //       this.isLoadingResults = false;
     //       this.isRateLimitReached = false;
     //       this.resultsLength = data.total_count;
     //
     //       return data.items;
     //     })
     //     .catch(() => {
     //       this.isLoadingResults = false;
     //       // Catch if the GitHub API has reached its rate limit. Return empty data.
     //       this.isRateLimitReached = true;
     //       return Observable.of([]);
     //     })
     //     .subscribe(data => this.dataSource.data = data)
