import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { DateService } from '../services/date.service';
import { DatatableService } from '../services/datatable.service';

import { CONFIGS } from '../shared/configurations';
import { Balance } from '../shared/balance';

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

  balLedger: number;
  projBalance: number;
  bal: Balance = new Balance;
  date = new FormControl(this.dateservice.todayDate);
  tableEntries = new DatatableService(this.http, this.dateservice);

  constructor(private http: HttpClient, public dateservice: DateService) { }

  ngOnInit() {
    this.getProjectedValue(this.dateservice.parseDate(this.dateservice.todayDate));
    this.getBalances('1900-1-1',this.dateservice.parseDate(this.dateservice.todayDate));
  }

  updateEndDate(val: Date): void {
    this.getProjectedValue(this.dateservice.parseDate(val));
  }

  getProjectedValue(date: string): void {
    const href = CONFIGS.baseUrl;
    const requestUrl =`${href}projected-balance/${date}`;
    this.http.get<ProjectedBalance>(requestUrl)
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

  getBalances(startDate: string, endDate: string) {
    this.tableEntries.getBalances(startDate, endDate)
    .subscribe(data =>
      { this.bal.ledgeramount = data.ledgeramount / 100;
    },
    (err: HttpErrorResponse) => {
       if (err.error instanceof Error) {
         // A client-side or network error occurred. Handle it accordingly.
         console.log('An error occurred:', err.error.message);
       } else {
         // The backend returned an unsuccessful response code.
         // The response body may contain clues as to what went wrong,
         this.balLedger = null;
         console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
       }
     }
   );
  }

  // this is called when an entry is successfully deleted in the table ledger component.
  // the projbalance and actual balance should be updated
  onUpdate(update: boolean) {
  this.getProjectedValue(this.dateservice.parseDate(this.dateservice.todayDate));
  this.getBalances('1900-1-1',this.dateservice.parseDate(this.dateservice.todayDate));
  }
}


export interface ProjectedBalance {
  projBalance: number;
}
