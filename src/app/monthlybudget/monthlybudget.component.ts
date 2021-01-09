import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { MatTableDataSource } from '@angular/material'


import { DateService } from '../services/date.service';
import { DatatableService } from '../services/datatable.service';
import { PaymenttypeService } from '../services/paymenttype.service';

import { PaymentType } from '../shared/paymenttype';

@Component({
  selector: 'app-monthlybudget',
  templateUrl: './monthlybudget.component.html',
  styleUrls: ['./monthlybudget.component.scss']
})
export class MonthlybudgetComponent implements OnInit {

  // used to form route url to retrieve budget entries  
  entryType = 'budget';
  datatype = 'budget-entries'
  isLoading = true;

  // Dates used to initially configure Date Pickers which are used to populate the datatable
  firstOfMonth: Date = this.dateservice.firstDayMonth;
  todayDate: Date = this.dateservice.todayDate;
  lastOfMonth: Date = this.dateservice.lastDayMonth;
  date = new FormControl(this.dateservice.todayDate); // for projBalance
  startDate = new FormControl(this.firstOfMonth);
  endDate = new FormControl(this.lastOfMonth);

   // object used to load payment types drop down list
   paymentTypes: PaymentType 

  displayedColumns = ['date', 'credit', 'debit', 'store', 'category', 'paymentname'];
  // displayedColumnsMobile = ['date', 'credit', 'debit', 'store'];
  displayMobile: boolean;
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  pageSize = 25;
  pageSizeOptions = [10, 25, 100];

  tableEntries: DatatableService | null;
  constructor(private http: HttpClient, private paymenttypeservice: PaymenttypeService,
    private dateservice: DateService, private datatableserve: DatatableService) {
   }

  ngOnInit() {
    this.getPaymentTypes();
    this.tableEntries = new DatatableService(this.http, this.dateservice);
  }

  ngAfterViewInit() {
    // table methods
    this.getValues(this.dateservice.parseDate(this.firstOfMonth), this.dateservice.parseDate(this.lastOfMonth));
 }

 // updates table along with Estimated and Actual Amounts, but not projected or actual as of today
getValues(startDate: string, endDate: string) {
  this.isLoading = true;

  this.tableEntries.getEntries(this.datatype, startDate, endDate)
  .subscribe( data => {
    // this.flattenData(data[0]);
    if (data != null) {
      this.dataSource.data = data;
    } else {
      this.dataSource.data = [];
    }
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

  // get all stores and categories to display on entry form.
  getPaymentTypes(): void {
    this.paymenttypeservice.getPaymentTypes()
    .subscribe(data => {
        this.paymentTypes = data;
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
      }
    );
  }

}
