import {Component, Input, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
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
import { DatatableService } from '../services/datatable.service';

@Component({
  selector: 'app-table-ledger',
  templateUrl: './table-ledger.component.html',
  styleUrls: ['./table-ledger.component.scss']
})


export class TableLedgerComponent implements AfterViewInit   {
  // dataType must be either budget-entries or ledger-entries. It is used to query for type of datatable entries.
  @Input() dataType: string;

  private httpSubscription;
  // Dates used to initially configure Date Pickers which are used to populate the datatable
  firstOfMonth: Date = this.dateservice.firstDayMonth;
  todayDate: Date = this.dateservice.todayDate;
  startDate = new FormControl(this.firstOfMonth);
  endDate = new FormControl(this.todayDate);

  displayedColumns = ['date', 'credit', 'debit', 'store', 'category'];
  dataSource = new MatTableDataSource();
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tableEntries: DatatableService | null;
  constructor(private http: HttpClient, private dateservice: DateService, ledgerservice: DatatableService) {}
  ngAfterViewInit() {

    // console.log(CONFIG.baseUrl);
    this.tableEntries = new DatatableService(this.http, this.dateservice);
     // If the user changes the sort order, reset back to the first page.
     this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;

     this.httpSubscription = this.getTableEntries(this.dateservice.parseDate(this.firstOfMonth), this.dateservice.parseDate(this.todayDate));
 }
 // make sure to unsubscribe to the getTableEntries
 ngOnDestroy() {
   this.httpSubscription.unsubscribe();
 }

// dataType must be either budget-entries or ledger-entries. It is used to query for type of datatable entries.
// call service to get back a list of table entries. These could be for ledger or budget
 getTableEntries(startDate: string, endDate: string): void {
   this.tableEntries.getEntries(this.dataType, startDate, endDate)
   .map(data => {
     return data;
   })
   .catch(() => {
     return Observable.of([]);
   })
   .subscribe(data => this.dataSource.data = data)
 }

 updateDate(startDate: Date, endDate: Date): void {
   this.getTableEntries(this.dateservice.parseDate(startDate), this.dateservice.parseDate(endDate))
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
