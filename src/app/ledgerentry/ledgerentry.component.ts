import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import  'rxjs/add/operator/switchMap';

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

 //  myForm = new FormGroup ({
 //   storeControl: new FormControl(),
 //   date: new FormControl(this.dateservice.todayDate),
 // });

  // a route parameter that determines whether the entry should be posted as ledger or budget
  entryType: string;
  entryTypeLabel: string; // Used in <h3> tag of template to capitalize first letter.
  flashMessage: string; // Add message indicating if new entry successful
  isError: boolean = false;
  // object used to load store autocomplete and category select boxes
  storeAndCat: StoreAndCat = {category: [], store: []};
  //intialize model
  model: Ledger = {id: null, credit: 0, debit: 0, trans_date: this.dateservice.todayDate,
    category: {id: null, category_name: null},
    store: {id: null, store_name: null, default_credit: 0, default_debit:0}};

  storeControl: FormControl = new FormControl();
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

  constructor(private http: HttpClient, private dateservice: DateService,
    private ledgerservice: LedgerService, private storeandcatservice: StoreandcatService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe( params =>{ this.entryType = params.get('entrytype');
    this.entryTypeLabel = this.entryType[0].toUpperCase() + this.entryType.substring(1);
  });


    this.getStoreAndCat()
    // this.storesAndCats = new StoreandcatService(this.http);
    this.filteredOptions = this.storeControl.valueChanges
    .pipe(
    startWith(''),
    map(val => this.filter(val))
    );
  }
  // filter for store autocomplete
  filter(val: string): Store[] {
  val = val.toString().toLowerCase();
  return this.storeAndCat.store.filter(option =>
    option.store_name.toLowerCase().indexOf(val) === 0);
  }

  // Adds new entry for ledger or budget
  onSubmit() {
  // default amounts are loaded into the model for some stores. This sets the unused amount to zero.
  // ie. if store has defaul debit amount, but doing a credit. the debit should be set to zero
  // before submitting the form
    if (this.isCredit) {
      this.model.debit = 0;
    }
    else {
      this.model.credit = 0;
    }
    // post new entry
    // const req = this.ledgerservice.createNewEntry(JSON.stringify(this.model), this.entryType);
    const req = this.ledgerservice.createNewEntry(this.model, this.entryType);
    req.subscribe(data => {
      // reset model after successful entry
      this.isError = false;
      this.model = {id: null, credit: 0, debit: 0, trans_date: this.dateservice.todayDate,
        category: {id: null, category_name: null},
        store: {id: null, store_name: null, default_credit: 0, default_debit:0}};
        // navigate to entries page after successfully creating new entry
        if (this.entryType == 'ledger') {
          this.router.navigate(['/ledger/ledger/ledger-entries']);
        } else {
        this.router.navigate(['/budget/budget/budget-entries']);
      }
    },
    (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
          this.flashMessage = err.error.message;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.isError = true;
          this.flashMessage = err.error;
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        });
  }

  showType(val): void {
    // isCredit is a boolean that determines whether the entry is credit or debit
    // reset amounts to 0 when switching between types
    // this.model.credit = 0;
    // this.model.debit = 0;
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
  getDisplayFn() {
    return (val) => this.display(val);
  }
  display(store): string {
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
