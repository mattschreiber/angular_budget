import {Component, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
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
import { LedgerService } from '../services/ledger.service';


@Component({
  selector: 'app-table-ledger',
  templateUrl: './table-ledger.component.html',
  styleUrls: ['./table-ledger.component.scss']
})


export class TableLedgerComponent implements AfterViewInit   {

  private httpSubscription;
  startDate = new FormControl(this.dateservice.firstDayMonth);
  endDate = new FormControl(this.dateservice.todayDate);
  displayedColumns = ['date', 'credit', 'debit', 'store', 'category'];

  dataSource = new MatTableDataSource();
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tableEntries: LedgerService | null;
  constructor(private http: HttpClient, private dateservice: DateService, ledgerservice: LedgerService) {}
  ngAfterViewInit() {
    this.tableEntries = new LedgerService(this.http, this.dateservice);
     // If the user changes the sort order, reset back to the first page.
     this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;

     this.httpSubscription = this.getTableEntries();
 }

 ngOnDestroy() {
   this.httpSubscription.unsubscribe();
 }

 getTableEntries(): void {
   this.tableEntries.getRepoIssues()
   .map(data => {
     return data;
   })
   .catch(() => {
     return Observable.of([]);
   })
   .subscribe(data => this.dataSource.data = data)
 }
}

//   const href = 'http://localhost:5000/ledger-entries/';
//   const requestUrl =`${href}${this.dateservice.parseDate(this.dateservice.firstDayMonth)}/${this.dateservice.parseDate(this.dateservice.todayDate)}`;
//   console.log(requestUrl);
//   this.http.get<LedgerEntries[]>(requestUrl)
//   .map(data => {
//     this.resultsLength = data.length;
//     this.paginator.pageSize = 10;
//     return data;
//   })
//   .subscribe(data => {
//    this.dataSource.data = data;
//  });

// Observable.merge(this.sort.sortChange, this.paginator.page)
//     .startWith(null)
//     .switchMap(() => {
//       return this.exampleDatabase!.getRepoIssues(
//           this.sort.active, this.sort.direction, this.paginator.pageIndex);
//     })
//     .map(data => {
//       return data;
//     })
//     .catch(() => {
//       return Observable.of([]);
//     })
//     .subscribe(data => this.dataSource.data = data)
