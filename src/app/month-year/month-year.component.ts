import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DateService } from '../services/date.service';
import { MONTHS } from '../shared/months';

@Component({
  selector: 'app-month-year',
  templateUrl: './month-year.component.html',
  styleUrls: ['./month-year.component.scss']
})
export class MonthYearComponent implements OnInit {

  @Output() newYear = new EventEmitter<number>();
  @Output() newMonth = new EventEmitter<number>();

  // used to populate select boxes in template
  month = MONTHS;
  years: number[] = this.dateservice.listOfYears();
  monthSelect = new FormControl(this.month[new Date().getMonth()].monthValue);
  yearSelect = new FormControl(new Date().getFullYear());
  

  constructor(private dateservice: DateService) { }

  ngOnInit() {
    // the list of years to choose from should include 1 year in the future.
    this.years.unshift(new Date().getFullYear() + 1);

    this.yearSelect.valueChanges
    .subscribe(val => {
      this.newYear.emit(val);
    });

    this.monthSelect.valueChanges
    .subscribe(val => {
      this.newMonth.emit(val);
    });
  }
}
