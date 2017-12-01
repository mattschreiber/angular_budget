import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { DateService } from '../services/date.service';

@Component({
  selector: 'app-ledgerentry',
  templateUrl: './ledgerentry.component.html',
  styleUrls: ['./ledgerentry.component.scss']
})
export class LedgerentryComponent implements OnInit {

  model = {remember: false, username: "Matt"};
  myControl: FormControl = new FormControl();
  date = new FormControl(this.dateservice.todayDate);

  options = [
    'One',
    'Two',
    'Three'
  ];

  typeTrans = [
    {value: 'credit', viewValue: 'Credit'},
    {value: 'debit', viewValue: 'Debit'},
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

}
