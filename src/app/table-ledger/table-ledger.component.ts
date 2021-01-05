import {Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, OnDestroy, OnInit, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource, MatTooltip,
  MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatExpansionPanel} from '@angular/material';
import {Observable, Subscription, of as observableOf,  forkJoin } from 'rxjs';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import { ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { DateService } from '../services/date.service';
import { DatatableService } from '../services/datatable.service';

import { Balance } from '../shared/balance';

@Component({
  selector: 'app-table-ledger',
  templateUrl: './table-ledger.component.html',
  styleUrls: ['./table-ledger.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class TableLedgerComponent implements AfterViewInit, OnInit, OnDestroy   {

  entryType = 'Ledger';
  balLedger: number;
  projBalance: number;
  currentBal: Balance = new Balance;
  bal: Balance = new Balance; // for both budget and ledger balances from table date pickers
  dataType: string;

  isLoading = true;
  isLedger = true;

  // used to determine screen size
  watcher: Subscription;
  activeMediaQuery = '';

  // Dates used to initially configure Date Pickers which are used to populate the datatable
  firstOfMonth: Date = this.dateservice.firstDayMonth;
  todayDate: Date = this.dateservice.todayDate;
  lastOfMonth: Date = this.dateservice.lastDayMonth;
  date = new FormControl(this.dateservice.todayDate); // for projBalance
  startDate = new FormControl(this.firstOfMonth);
  endDate = new FormControl(this.lastOfMonth);

  displayedColumns = ['date', 'credit', 'debit', 'store', 'category', 'paymentname'];
  // displayedColumnsMobile = ['date', 'credit', 'debit', 'store'];
  displayMobile: boolean;
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  pageSize = 25;
  pageSizeOptions = [10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tableEntries: DatatableService | null;
  constructor(private http: HttpClient, private dateservice: DateService, private datatableserve: DatatableService,
              private route: ActivatedRoute, private router: Router,
              public dialog: MatDialog, private media: MediaObserver) {
                // this.watcher = media.media$.subscribe((change: MediaChange) => {
                //   this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
                //   if ( change.mqAlias === 'xs' || change.mqAlias === 'sm') {
                //      this.displayMobile = true;
                //    } else {
                //      this.displayMobile = false;
                //    }
                //  });
                this.watcher = media.asObservable()
                .pipe(
                  filter((changes: MediaChange[]) => changes.length > 0),
                  map((changes: MediaChange[]) => changes[0])
                ).subscribe((change: MediaChange) => {
                  this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
                    if ( change.mqAlias === 'xs' || change.mqAlias === 'sm') {
                      this.displayMobile = true;
                    } else {
                      this.displayMobile = false;
                  }
                })             
              }

  ngOnInit() {
    if (this.media.isActive('xs') || this.media.isActive('sm')) {
      this.displayMobile = true;
    } else {
      this.displayMobile = false;
    }
    this.route.paramMap
    .subscribe( params => {
      const temp: string = params.get('entrytype');
      this.entryType = temp[0].toUpperCase() + temp.slice(1);
      this.dataType = params.get('datatype');
      if (this.entryType === 'Budget') {
        this.isLedger = false;
      }
    });

    this.tableEntries = new DatatableService(this.http, this.dateservice);
  }
  ngAfterViewInit() {
    // this.getProjectedValue(this.dateservice.parseDate(this.dateservice.todayDate));
    if (this.entryType === 'Ledger') {
      this.getActualAndProj();
    }
    // table methods
    this.dataSource.paginator = this.paginator;
    this.getValues(this.dateservice.parseDate(this.firstOfMonth), this.dateservice.parseDate(this.lastOfMonth));
 }

// updates table along with Estimated and Actual Amounts, but not projected or actual as of today
getValues(startDate: string, endDate: string) {
   this.isLoading = true;
   const table = this.tableEntries.getEntries(this.dataType, startDate, endDate);
   const balances =  this.tableEntries.getBalances(startDate, endDate);

   forkJoin(table, balances)
   .subscribe( data => {
     this.flattenData(data[0]);
     this.bal = data[1];
     this.isLoading = false;
   },
   (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
 });
 }

// used to populate projected value and actual as of today textboxes
 getActualAndProj() {
   const projectedValue = this.tableEntries.getProjectedValue(this.dateservice.parseDate(this.dateservice.todayDate));
   const balances = this.tableEntries.getBalances('1900-1-1', this.dateservice.parseDate(this.dateservice.todayDate));
   forkJoin(projectedValue, balances)
   .subscribe( data => {
     this.projBalance = data[0].projBalance / 100;
     this.currentBal.ledgeramount = data[1].ledgeramount / 100;
   },
   (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        this.projBalance = null;
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
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
  if (data != null) {
    let i: number;
    let flatData: {id: number, credit: number, debit: number, category_name: string, store_name: string, trans_date: Date, payment_name: string, category_id: number, payment_type_id: number};
    const arr = [];
    for (i = 0; i < data.length; i++) {
      flatData = {
        id: data[i].id,
        credit: data[i].credit,
        debit: data[i].debit,
        category_name: data[i].category.category_name,
        store_name: data[i].store.store_name,
        trans_date: data[i].trans_date,
        payment_name: data[i].payment_type.payment_name,
        category_id: data[i].category.id,
        payment_type_id: data[i].payment_type.id
     };
      arr.push(flatData);
    }
    this.dataSource.data = arr;
  } else {
    this.dataSource.data = [];
  }
 }

 updateDate(startDate: string, endDate: string): void {

   // convert to dates so comparison works
   const startD = new Date(startDate);
   const endD = new Date(endDate);

   if (startD <= endD) {
     this.getValues(this.dateservice.parseDate(startDate), this.dateservice.parseDate(endDate));
     this.paginator.pageIndex = 0;
   } else {
     // The end date should not be before the start date. set table and balances to zero
     this.dataSource.data = [];
     this.bal = {ledgeramount: 0, budgetamount: 0};
  }
 }

 openUpdate(row, entryType): void {
   const dialogRef = this.dialog.open(UpdateEntryComponent, {
    //  width: '300px',
    //  height: '200px',
     data: { id: row.id, debit: row.debit, credit: row.credit, category_id: row.category_id, payment_type_id: row.payment_type_id, entryType: this.entryType }
   });

   dialogRef.afterClosed()
   .subscribe(result => {
     // Only update Ledger and Budget balances if they are visible for the component view
     if (result === 'updated') {
      this.getValues(this.dateservice.parseDate(this.startDate.value), this.dateservice.parseDate(this.endDate.value));
       // only updatr home component values if the entry being deleted is from the ledger
     if (this.entryType === 'Ledger' ) {
      this.getActualAndProj();
     }
    }
   });
 }

 //  methods from HomeComponent
 getProjectedValue(date: string) {
   this.tableEntries.getProjectedValue(date)
   .subscribe(data => {
    this.projBalance = data.projBalance / 100;
  },
  (err: HttpErrorResponse) => {
     if (err.error instanceof Error) {
       // A client-side or network error occurred. Handle it accordingly.
       console.log('An error occurred:', err.error.message);
     } else {
       // The backend returned an unsuccessful response code.
       // The response body may contain clues as to what went wrong,
       this.projBalance = null;
       console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
     }
   }
   ); // end current
 } // getProjectedValue
 updateEndDate(val: Date): void {
   this.getProjectedValue(this.dateservice.parseDate(val));
 }



}
