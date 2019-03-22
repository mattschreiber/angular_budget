import { Component, OnInit } from '@angular/core';
import {of as observableOf} from 'rxjs';
import {catchError} from 'rxjs/operators';

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

  constructor(private dateservice: DateService, private reportservice: ReportService) { }

  ngOnInit() {
    // start and end date for db query
    const startDate: Date = this.dateservice.subtractMonth(new Date(), 11);
    startDate.setDate(1);
    const endDate: Date = this.dateservice.addMonth(new Date(), 1);
    endDate.setDate(1);

    this.reportservice.getMonthlyTotalAmounts(this.dateservice.parseDate(startDate), this.dateservice.parseDate(endDate))
    .pipe(
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(data => {
      this.dataSource = this.reportservice.prepareMonthlyAmounts(data);
    });
  }

}
