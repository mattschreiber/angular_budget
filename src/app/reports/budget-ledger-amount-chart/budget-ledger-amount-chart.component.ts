import { Component, OnInit } from '@angular/core';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';

import { DateService } from '../../services/date.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-budget-ledger-amount-chart',
  templateUrl: './budget-ledger-amount-chart.component.html',
  styleUrls: ['./budget-ledger-amount-chart.component.scss']
})
export class BudgetLedgerAmountChartComponent implements OnInit {

  // fusionchart for comparing budget vs ledger spent for given month
  id = 'chart2';
  width = 900;
  height = 600;
  type = 'msline';
  dataFormat = 'json';
  dataSource;
  title = 'Budget vs Actual';

  startDate: Date = new Date('2017-2-1');
  endDate: Date = new Date('2018-2-1');

  constructor(private dateservice: DateService, private reportservice: ReportService) { }

  ngOnInit() {
    this.reportservice.getMonthlyTotalAmounts(this.dateservice.parseDate(this.startDate), this.dateservice.parseDate(this.endDate))
    .pipe(
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.dataSource = this.reportservice.prepareMonthlyAmounts(data);
    })
  }

}
