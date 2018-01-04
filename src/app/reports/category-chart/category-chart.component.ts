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
import { MONTHS } from '../../shared/months';

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss']
  // encapsulation: ViewEncapsulation.None
})

export class CategoryChartComponent implements OnInit {

  month = MONTHS;
  years: number[] = this.dateservice.listOfYears();

  monthSelect = new FormControl(this.month[new Date().getMonth()].monthValue);
  yearSelect = new FormControl(new Date().getFullYear());

  id = 'chart1';
  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;
  title = 'Angular4 FusionCharts Sample';

  constructor(private dateservice: DateService) {
  }

  ngOnInit() {

    merge(this.monthSelect.valueChanges, this.yearSelect.valueChanges)
      .debounceTime(1000)
      .pipe(
        startWith({}),
        // switchMap(() => {
        //   this.isLoadingResults = true;
        //   return this.exampleDatabase!.getRepoIssues(
        //     this.sort.active, this.sort.direction, this.paginator.pageIndex);
        // }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => console.log(data));

    // this.monthSelect.valueChanges.subscribe(
    //   val => {console.log(`Here is the month: ${val}`)}
    // )

    this.dataSource = {
            "chart": {
                "caption": "Harry's SuperMart",
                "subCaption": "Top 5 stores in last month by revenue",
                "numberprefix": "$",
                "theme": "zune"
            },
            "data": [
                {
                    "label": "Bakersfield Central",
                    "value": "880000"
                },
                {
                    "label": "Garden Groove harbour",
                    "value": "730000"
                },
                {
                    "label": "Los Angeles Topanga",
                    "value": "590000"
                },
                {
                    "label": "Compton-Rancho Dom",
                    "value": "520000"
                },
                {
                    "label": "Daly City Serramonte",
                    "value": "330000"
                }
            ]
        }
  }

}
