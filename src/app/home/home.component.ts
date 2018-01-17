import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { timer } from 'rxjs/observable/timer';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { DateService } from '../services/date.service';
import { DatatableService } from '../services/datatable.service';

import { CONFIGS } from '../shared/configurations';
import { Balance } from '../shared/balance';
import { ProjectedBalance } from '../services/datatable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  // dataType must be either budget-entries or ledger-entries. It is used to query for type of datatable entries.
  // This is passed to the query that populates the datatable within the table-ledger component
  dataType: string = 'ledger-entries';
  showBalance: boolean = false; // Determines whether or not to show Ledger and Budget Amounts
  entryType: string = "Ledger" // Sets header for table-ledger to either Ledger or Budget
  // end input variables

  isLoadingResults = false;

  balLedger: number;
  projBalance: number;
  bal: Balance = new Balance;
  date = new FormControl(this.dateservice.todayDate);
  tableEntries = new DatatableService(this.http, this.dateservice);

  constructor(private http: HttpClient, public dateservice: DateService) { }

  ngOnInit() {

    this.getValues();
  }

  updateEndDate(val: Date): void {
    this.getProjectedValue(this.dateservice.parseDate(val));
  }

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
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
      }
    }
    );// end current
  } // getProjectedValue


// get projectedValue and actual ledger balance as of today
  getValues() {

    this.isLoadingResults = true;
    let projectedValue = this.tableEntries.getProjectedValue(this.dateservice.parseDate(this.dateservice.todayDate));
    let balances = this.tableEntries.getBalances('1900-1-1',this.dateservice.parseDate(this.dateservice.todayDate));
    forkJoin(projectedValue, balances)
    .subscribe( data => {
      this.projBalance = data[0].projBalance / 100;
      this.bal.ledgeramount = data[1].ledgeramount / 100;
      this.isLoadingResults = false;
    },
    (err: HttpErrorResponse) => {
       if (err.error instanceof Error) {
         // A client-side or network error occurred. Handle it accordingly.
         console.log('An error occurred:', err.error.message);
       } else {
         // The backend returned an unsuccessful response code.
         // The response body may contain clues as to what went wrong,
         this.projBalance = null;
         console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
     }
  });

  }

  // this is called when an entry is successfully deleted in the table ledger component.
  // the projbalance and actual balance should be updated
  onUpdate(update: boolean) {
    this.getValues();
  }
}
