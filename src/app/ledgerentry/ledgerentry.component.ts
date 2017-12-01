import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { DateService } from '../services/date.service';
import { StoreandcatService } from '../services/storeandcat.service';

import { Ledger } from '../shared/ledger';
import { Category } from '../shared/category';
import { Store } from '../shared/store';

@Component({
  selector: 'app-ledgerentry',
  templateUrl: './ledgerentry.component.html',
  styleUrls: ['./ledgerentry.component.scss']
})
export class LedgerentryComponent implements OnInit {

  storeAndCat: StoreAndCat = {category: [], store: []};

  model: Ledger = {credit: null, debit: null, trans_date: this.dateservice.todayDate,
    category: {id: 0, category_name: ''},
    store: {id: 0, store_name: '', default_credit: 0, default_debit:0}};

  myControl: FormControl = new FormControl();
  date = new FormControl(this.dateservice.todayDate);

  isCredit: boolean = false;

  typeTrans = [
    {value: 'credit', viewValue: 'Credit'},
    {value: 'debit', viewValue: 'Debit'},
  ];

  filteredOptions: Observable<Store[]>;

  // storesAndCats: StoreandcatService | null;

  constructor(private http: HttpClient, private dateservice: DateService, private storeandcatservice: StoreandcatService) { }

  ngOnInit() {
    this.getStoreAndCat()
    // this.storesAndCats = new StoreandcatService(this.http);
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
    startWith(''),
    map(val => this.filter(val))
    );
  }

  filter(val: string): Store[] {
  return this.storeAndCat.store.filter(option =>
    option.store_name.toLowerCase().indexOf(val) === 0);
  }

  showType(val): void {
    console.log(val);
    // isCredit is a boolean that determines whether the entry is credit or debit
    // reset amounts to 0 when switching between types
    this.model.credit = null;
    this.model.debit = null;
    if (val === 'credit') {
      this.isCredit = true;
    }
    else {
      this.isCredit = false;
    }
  }

  getStoreAndCat() {
    this.storeandcatservice.getStoreAndCat()
    .subscribe(data =>
      {
        this.storeAndCat = data;
        console.log(this.storeAndCat);
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
  );
  }
  private getDisplayFn() {
    return (val) => this.display(val);
  }
  private display(store): string {
    //access component "this" here
    return store ? store.store_name : store;
  }

}

export interface StoreAndCat {
  category: Category[]
  store: Store[];
}
