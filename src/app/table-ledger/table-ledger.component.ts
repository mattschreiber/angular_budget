import {Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, OnDestroy, OnInit, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource, MatTooltip,
  MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatExpansionPanel} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Subscription} from "rxjs/Subscription";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

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
  bal: Balance = new Balance;

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

    this.getTableEntries(this.dateservice.parseDate(this.firstOfMonth), this.dateservice.parseDate(this.lastOfMonth));
   // Only update Ledger and Budget balances if they are visible for the component view
    if (this.showBalance) {
      this.getBalances(this.dateservice.parseDate(this.firstOfMonth), this.dateservice.parseDate(this.lastOfMonth))
    }
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
     this.flattenData(data);
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


// flatten the data returned from api to make filter simpler to implement
 flattenData(data) {
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
       this.getTableEntries(this.dateservice.parseDate(this.firstOfMonth), this.dateservice.parseDate(this.lastOfMonth));
       if (this.showBalance) {
         this.getBalances(this.dateservice.parseDate(this.firstOfMonth), this.dateservice.parseDate(this.lastOfMonth))
       }
       // only updatr home component values if the entry being deleted is from the ledger
       if (this.showBalance === false) {
         this.updateHome(true);
       }
    }
   });
 }

// emit event to home component that triggers refresh of it's fields
 updateHome(update: boolean){
   this.onUpdate.emit(update);
 }
}
