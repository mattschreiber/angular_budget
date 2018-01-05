import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import  'rxjs/add/operator/debounceTime';
import {switchMap} from 'rxjs/operators/switchMap';

import { DateService } from '../../services/date.service';
import { ReportService } from '../services/report.service';

import { MONTHS } from '../../shared/months';
import { ReportCategoryAmounts } from '../services/report.service';

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss']
  // encapsulation: ViewEncapsulation.None
})

export class CategoryChartComponent implements OnInit {

  // used to populate select boxes in template
  month = MONTHS;
  years: number[] = this.dateservice.listOfYears();
  monthSelect = new FormControl(this.month[new Date().getMonth()].monthValue);
  yearSelect = new FormControl(new Date().getFullYear());

  // fusionchart for comparing budget vs ledger spent for given month
  id = 'chart1';
  width = 900;
  height = 600;
  type = 'mscolumn2d';
  dataFormat = 'json';
  dataSource;
  title = 'Budget vs Actual';

  constructor(private dateservice: DateService, private reportservice: ReportService) {
  }

  ngOnInit() {


    merge(this.monthSelect.valueChanges, this.yearSelect.valueChanges)
      // .debounceTime(1000)
      .pipe(
        startWith({}),
        switchMap(() => {
          // this.isLoadingResults = true;
          return this.reportservice.getReportCategoryAmounts(
            this.monthSelect.value, this.yearSelect.value);
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => {
        this.dataSource = this.reportservice.prepareCategoryAmounts(data);
      });
  }
}
