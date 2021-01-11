import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { MatTableDataSource } from '@angular/material'


import { DateService } from '../services/date.service';
import { DatatableService, TableEntries } from '../services/datatable.service';
import { PaymenttypeService } from '../services/paymenttype.service';
import { StoreandcatService } from '../services/storeandcat.service';
import { LedgerService } from '../services/ledger.service';

import { PaymentType } from '../shared/paymenttype';
import { Category } from '../shared/category';
import { Store } from '../shared/store';
import { Ledger } from '../shared/ledger';

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

  // variables used to track the year and month that will be used to create the new budget entries
  newBudgetYear: number;
  newBudgetMonth: number;

  // Dates used to initially configure Date Pickers which are used to populate the datatable
  firstOfMonth: Date = this.dateservice.firstDayMonth;
  todayDate: Date = this.dateservice.todayDate;
  lastOfMonth: Date = this.dateservice.lastDayMonth;
  date = new FormControl(this.dateservice.todayDate); // for projBalance
  startDate = new FormControl(this.firstOfMonth);
  endDate = new FormControl(this.lastOfMonth);

  // object used to load payment types drop down list
  paymentTypes: PaymentType 

  // object used to capture budget data returned from getValues()
  budgetData: Ledger[] | any[] = [];

  storeAndCat: StoreAndCat = {category: [], store: []};

  displayedColumns = ['date', 'credit', 'debit', 'store', 'category', 'paymentname'];
  // displayedColumnsMobile = ['date', 'credit', 'debit', 'store'];
  displayMobile: boolean;
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  pageSize = 25;
  pageSizeOptions = [10, 25, 100];

  tableEntries: DatatableService | null;

  constructor(private http: HttpClient, private paymenttypeservice: PaymenttypeService,
    private dateservice: DateService, private datatableserve: DatatableService,
    private storeandcatservice: StoreandcatService, private ledgerservice: LedgerService) {
   }

  ngOnInit() {
    this.getPaymentTypes();
    this.getStoreAndCat();
    this.tableEntries = new DatatableService(this.http, this.dateservice);

    // set defaults for the dates that will be used to create new budget entries
    // defaults are set to current month and year.
    this.newBudgetMonth = new Date().getMonth();
    this.newBudgetYear = new Date().getFullYear();

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
      let i: number;
      for (i = 0; i < data.length; i++) {
        data[i].credit = data[i].credit/100;
        data[i].debit = data[i].debit/100;
      }
      this.dataSource.data = data;
      this.copyData(data);
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

// copyData createa an array of Budget Objects to keep track of changes made to row entries
// the budgetData will be updated when change events are called for various cells in the table
copyData(data: any[]): void{
  data.forEach(element => {
    let l: Ledger;
    l = {id: element.id, credit: element.credit, debit: element.debit, trans_date: element.trans_date, 
      category: {id: element.category.id, category_name: null}, 
      store: {id: element.store.id, store_name: null, default_credit: null, default_debit: null},
      payment_type: {id: element.payment_type.id, payment_name: null}}
    this.budgetData.push(l);
  });
}

  // get all stores and categories to display on entry form.
  getStoreAndCat(): void {
    this.storeandcatservice.getStoreAndCat()
    .subscribe(data => {
        this.storeAndCat = data;
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

  updateCat(category_id: number, index: number): void {
    this.budgetData[index].category.id = category_id;
  }

  updatePaymentType(pt_id: number, index: number): void {
    this.budgetData[index].payment_type.id = pt_id;
  }

  debitChange(debit: number, index: number): void {
    this.budgetData[index].debit = debit;
    // console.log("debit " + debit + " index: " + index);
  }

  creditChange(credit: number, index: number): void {
    this.budgetData[index].credit = credit;
    // console.log("credit : " + credit + " index: " + index);
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

  // function to update year when event emitted from month-year component
  yearUpdated(year: number): void {
    this.newBudgetYear = year;
    console.log(this.newBudgetYear);
  }

  // the constant months sets the numeric value for the month equal to its corresponding number
  // however in this case we need to get the true index so we subtract 1.
  monthUpdated(month: number): void {
    this.newBudgetMonth = month - 1;
    console.log(this.newBudgetMonth);
  }

  // function that creates new budget entries for a given month and year
  newBudget(): void {

    let i: number = 0;
    this.budgetData.forEach(element => {
      const d = new Date (element.trans_date);
      const timeOffSet: number = d.getTimezoneOffset();
      const offsetTime = new Date(d.getTime() + timeOffSet * 60 * 1000);
      offsetTime.setUTCMonth(this.newBudgetMonth);
      offsetTime.setUTCFullYear(this.newBudgetYear);

      this.budgetData[i].trans_date = offsetTime.toISOString();
      console.log(this.budgetData[i].trans_date);
      i++; 
    });
    this.budgetData.forEach(element => {
      const req = this.ledgerservice.createNewEntry(element, this.entryType);
      req.subscribe(data => {
        // reset model after successful entry
        console.log(data);
      },
      (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
            // this.flashMessage = err.error.message;
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // this.isError = true;
            // this.flashMessage = err.error;
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
          });
      
    });
  }

}

export interface StoreAndCat {
  category: Category[];
  store: Store[];
}

