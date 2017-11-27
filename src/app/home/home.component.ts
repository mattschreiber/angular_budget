import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

import { DateService } from '../services/date.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  // dataType must be either budget-entries or ledger-entries. It is used to query for type of datatable entries.
  // This is passed to the query that populates the datatable within the table-ledger component
  dataType: string = 'ledger-entries';

  projBalance: number;
  date = new FormControl(this.dateservice.todayDate);
  private httpSubscription;

  constructor(private http: HttpClient, private dateservice: DateService) { }

  ngOnInit() {
    this.getProjectedValue(this.dateservice.parseDate(this.dateservice.todayDate));
  }

  updateEndDate(val: Date): void {
    this.getProjectedValue(this.dateservice.parseDate(val));
    console.log(this.dateservice.firstOfMonth(val));
    console.log(this.dateservice.lastOfMonth(val));
  }

  getProjectedValue(date: string): void {
    const href = 'http://localhost:5000/home/';
    const requestUrl =`${href}${date}`;
    this.httpSubscription = this.http.get<ProjectedBalance>(requestUrl)
    .subscribe(data => {
     this.projBalance = data.projBalance * .01;
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
  }

  ngOnDestroy() {
    this.httpSubscription.unsubscribe();
  }
}

export interface ProjectedBalance {
  projBalance: number;
}
