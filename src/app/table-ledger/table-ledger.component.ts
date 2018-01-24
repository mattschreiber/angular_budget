import {Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, OnDestroy, OnInit, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource, MatTooltip,
  MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatExpansionPanel} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Subscription} from "rxjs/Subscription";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
// import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { UpdateEntryComponent } from '../update-entry/update-entry.component';
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
  @Output() onUpdate = new EventEmitter<boolean>();
  @Output() isLoaded = new EventEmitter<boolean>();
  bal: Balance = new Balance;
  isLoading: boolean = true;

  // used to determine screen size
  watcher: Subscription;
  activeMediaQuery = "";

  // Dates used to initially configure Date Pickers which are used to populate the datatable
  firstOfMonth: Date = this.dateservice.firstDayMonth;
  todayDate: Date = this.dateservice.todayDate;
  lastOfMonth: Date = this.dateservice.lastDayMonth;
  startDate = new FormControl(this.firstOfMonth);
  endDate = new FormControl(this.lastOfMonth);

  displayedColumns = ['date', 'credit', 'debit', 'store', 'category'];
  // displayedColumnsMobile = ['date', 'credit', 'debit', 'store'];
  displayMobile: boolean;
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tableEntries: DatatableService | null;
  constructor(private http: HttpClient, private dateservice: DateService, private datatableserve: DatatableService,
              public dialog: MatDialog, private media: ObservableMedia) {
                this.watcher = media.subscribe((change: MediaChange) => {
                  this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : "";
                  if ( change.mqAlias == 'xs' || change.mqAlias == 'sm') {
                     this.displayMobile = true;
                   }
                   else {
                     this.displayMobile = false;
                   }
                 });
              }

  ngOnInit(){
    if (this.media.isActive('xs') || this.media.isActive('sm')) {
      this.displayMobile = true;
    } else {
      this.displayMobile = false;
    }
  }
  ngAfterViewInit() {
    this.tableEntries = new DatatableService(this.http, this.dateservice);
    this.dataSource.paginator = this.paginator;
    this.getValues(this.dateservice.parseDate(this.firstOfMonth), this.dateservice.parseDate(this.lastOfMonth));
 }

 getValues(startDate: string, endDate: string) {
   let table = this.tableEntries.getEntries(this.dataType, startDate, endDate);
   let balances =  this.tableEntries.getBalances(startDate, endDate);

   forkJoin(table, balances)
   .subscribe( data => {
     this.flattenData(data[0]);
     this.bal = data[1];
     this.loading(true);
     this.isLoading = false;
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
 });
 }

 ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  // method to filter table entry results
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


// flatten the data returned from api to make filter simpler to implement
 flattenData(data) {
  if(data != null) {
    let i: number;
    let flatData: {id: number, credit: number, debit: number, category_name: string, store_name: string, trans_date: Date};
    let arr = [];
    for (i=0; i<data.length; i++) {
      flatData = {
        id: data[i].id,
        credit: data[i].credit,
        debit: data[i].debit,
        category_name: data[i].category.category_name,
        store_name: data[i].store.store_name,
        trans_date: data[i].trans_date
     }
      arr.push(flatData);
    }
    this.dataSource.data = arr;
  }
  else {
    this.dataSource.data = [];
  }
 }

 updateDate(startDate: string, endDate: string): void {

   // convert to dates so comparison works
   let startD = new Date(startDate);
   let endD = new Date(endDate);

   if (startD <= endD) {
     this.getValues(this.dateservice.parseDate(startDate), this.dateservice.parseDate(endDate));
     this.paginator.pageIndex = 0;
   } else {
     //The end date should not be before the start date. set table and balances to zero
     this.dataSource.data = [];
     this.bal ={ledgeramount: 0, budgetamount: 0};
  }
 }

 openUpdate(row, entryType): void {
   let dialogRef = this.dialog.open(UpdateEntryComponent, {
     width: '300px',
     height: '200px',
     data: { id: row.id, debit: row.debit, credit: row.credit, entryType: this.entryType }
   });

   dialogRef.afterClosed()
   .subscribe(result => {
     // Only update Ledger and Budget balances if they are visible for the component view
     if (result === "updated") {
      this.getValues(this.dateservice.parseDate(this.startDate.value), this.dateservice.parseDate(this.endDate.value));
       // only updatr home component values if the entry being deleted is from the ledger
       // if (this.showBalance === false) {
      this.updateHome(true);
       // }
    }
   });
 }

// emit event to home component that triggers refresh of it's fields
 updateHome(update: boolean) {
   this.onUpdate.emit(update);
 }

 loading(finishLoading: boolean) {
  this.isLoaded.emit(finishLoading);
 }

}
