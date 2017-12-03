import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { DateService } from '../services/date.service';
import { StoreandcatService } from '../services/storeandcat.service';
import { LedgerService } from '../services/ledger.service';

import { Ledger } from '../shared/ledger';
import { Category } from '../shared/category';
import { Store } from '../shared/store';

@Component({
  selector: 'app-ledgerentry',
  templateUrl: './ledgerentry.component.html',
  styleUrls: ['./ledgerentry.component.scss']
})
export class LedgerentryComponent implements OnInit {

  // object used to load store autocomplete and category select boxes
  storeAndCat: StoreAndCat = {category: [], store: []};
  //intialize model
  model: Ledger = {id: null, credit: 0, debit: 0, trans_date: this.dateservice.todayDate,
    category: {id: null, category_name: null},
    store: {id: null, store_name: null, default_credit: 0, default_debit:0}};

  myControl: FormControl = new FormControl();
  date = new FormControl(this.dateservice.todayDate);

  // used to determine whether entry is a credit or debit (attached to form fields in template)
  isCredit: boolean = false;

  // options for credit/debit select box
  typeTrans = [
    {value: 'credit', viewValue: 'Credit'},
    {value: 'debit', viewValue: 'Debit'},
  ];

  // observable for store autocomplet
  filteredOptions: Observable<Store[]>;

  // storesAndCats: StoreandcatService | null;

  constructor(private http: HttpClient, private dateservice: DateService,
    private ledgerservice: LedgerService, private storeandcatservice: StoreandcatService) { }

  ngOnInit() {
    this.getStoreAndCat()
    // this.storesAndCats = new StoreandcatService(this.http);
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
    startWith(''),
    map(val => this.filter(val))
    );
  }
  // filter for store autocomplete
  filter(val: string): Store[] {
  return this.storeAndCat.store.filter(option =>
    option.store_name.toLowerCase().indexOf(val) === 0);
  }

  // Adds new entry for ledger or budget
  onSubmit() {
    // first convert amounts from dollars and cents to cents for storing in db
    this.model.credit = this.model.credit * 100;
    this.model.debit = this.model.debit * 100;
    // post new entry
    const req = this.ledgerservice.createNewEntry(JSON.stringify(this.model));
    req.subscribe(data => console.log(data.id));
  }

  showType(val): void {
    // isCredit is a boolean that determines whether the entry is credit or debit
    // reset amounts to 0 when switching between types
    this.model.credit = 0;
    this.model.debit = 0;
    if (val === 'credit') {
      this.isCredit = true;
    }
    else {
      this.isCredit = false;
    }
  }
  // get all stores and categories to display on entry form.
  getStoreAndCat(): void {
    this.storeandcatservice.getStoreAndCat()
    .subscribe(data =>
      {
        this.storeAndCat = data;
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

  // next to functions are used to enable the store autocomplete to display the name while
  // making the value equal to the entire store object. THis is necessary for posting the correct data.
  private getDisplayFn() {
    return (val) => this.display(val);
  }
  private display(store): string {
    if (store != null) {
      this.model.credit = store.default_credit;
      this.model.debit = store.default_debit;
    }
    return store ? store.store_name : store;
  }

}

export interface StoreAndCat {
  category: Category[]
  store: Store[];
}
