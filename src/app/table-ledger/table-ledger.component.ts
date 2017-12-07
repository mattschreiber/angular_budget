import {Component, Input, AfterViewInit, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource, MatTooltip} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { DateService } from '../services/date.service';
import { DatatableService } from '../services/datatable.service';

import { Balance } from '../shared/balance';

@Component({
  selector: 'app-table-ledger',
  templateUrl: './table-ledger.component.html',
  styleUrls: ['./table-ledger.component.scss']
})


export class TableLedgerComponent implements AfterViewInit   {
  // dataType must be either budget-entries or ledger-entries. It is used to query for type of datatable entries.
  @Input() dataType: string;
  // set show balance to true in order to display Ledger Amount and/or Budget Amount
  @Input() showBalance: boolean;
  @Input() entryType: string; // Used to set heading to Budget or Ledger in html template
  bal: Balance = new Balance;

  // Dates used to initially configure Date Pickers which are used to populate the datatable
  firstOfMonth: Date = this.dateservice.firstDayMonth;
  todayDate: Date = this.dateservice.todayDate;
  lastOfMonth: Date = this.dateservice.lastDayMonth;
  startDate = new FormControl(this.firstOfMonth);
  endDate = new FormControl(this.lastOfMonth);

  displayedColumns = ['date', 'credit', 'debit', 'store', 'category'];
  displayedColumnsMobile = ['date', 'credit', 'debit', 'store'];
  displayMobile: boolean;
  dataSource = new MatTableDataSource();
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tableEntries: DatatableService | null;
  constructor(private http: HttpClient, private dateservice: DateService, datatableserve: DatatableService) {}

  ngOnInit(){
    // need to determine screenwidth before trying to load data table
    if (window.screen.width < 500) {
      this.displayMobile = true;
    }
    else {
      this.displayMobile = false;
    }
  }
  ngAfterViewInit() {

    // console.log(CONFIG.baseUrl);
    this.tableEntries = new DatatableService(this.http, this.dateservice);
    this.dataSource.paginator = this.paginator;

    this.getTableEntries(this.dateservice.parseDate(this.firstOfMonth), this.dateservice.parseDate(this.lastOfMonth));
    this.getBalances(this.dateservice.parseDate(this.firstOfMonth), this.dateservice.parseDate(this.lastOfMonth));
 }

// dataType must be either budget-entries or ledger-entries. It is used to query for type of datatable entries.
// call service to get back a list of table entries. These could be for ledger or budget
 getTableEntries(startDate: string, endDate: string): void {
   this.tableEntries.getEntries(this.dataType, startDate, endDate)
   .map(data => {
     if (data == null){
       throw Error;
     }
     return data;
   })
   .catch(() => {
     return Observable.of([]);
   })
   .subscribe(data => {
     this.dataSource.data = data;
   },
   (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
      }
    })
 }

 updateDate(startDate: Date, endDate: Date): void {
   this.getTableEntries(this.dateservice.parseDate(startDate), this.dateservice.parseDate(endDate));
   // Only update Ledger and Budget balances if they are visible for the component view
   if (this.showBalance) {
    this.getBalances(this.dateservice.parseDate(startDate), this.dateservice.parseDate(endDate));
   }
 }

 getBalances(startDate: string, endDate: string) {
   this.tableEntries.getBalances(startDate, endDate)
   .subscribe(data =>
     { this.bal = data;
   },
   (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
      }
    }
 );}

 openUpdate(row){
   console.log(row);
 }
}
