import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { DateService } from '../services/date.service';

import { Ledger } from '../shared/ledger';

@Component({
  selector: 'app-ledgerentry',
  templateUrl: './ledgerentry.component.html',
  styleUrls: ['./ledgerentry.component.scss']
})
export class LedgerentryComponent implements OnInit {

  model: Ledger = {credit: null, debit: null, trans_date: this.dateservice.todayDate,
    category: {id: 0, category_name: ''},
    store: {id: 0, store_name: ''}};

  myControl: FormControl = new FormControl();
  date = new FormControl(this.dateservice.todayDate);

  isCredit: boolean = false;

  options = [
    'One',
    'Two',
    'Three'
  ];

  typeTrans = [
    {value: 'credit', viewValue: 'Credit'},
    {value: 'debit', viewValue: 'Debit'},
  ];

  categories = [
    {value: '1', viewValue: 'Cat1'},
    {value: '2', viewValue: 'Cat2'},
  ];

  filteredOptions: Observable<string[]>;

  constructor(private dateservice: DateService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
    startWith(''),
    map(val => this.filter(val))
    );
  }

  filter(val: string): string[] {
  return this.options.filter(option =>
    option.toLowerCase().indexOf(val.toLowerCase()) === 0);
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

}
