import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CONFIGS } from '../../shared/configurations';

const href = CONFIGS.baseUrl;

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  getReportCategoryAmounts(month: string, year: string): Observable<ReportCategoryAmounts[]> {
    let Params = new HttpParams();
    Params = Params.append('month', month);
    Params = Params.append('year', year);
    const requestUrl = `${href}reports/categories`;
    return this.http.get<ReportCategoryAmounts[]>(requestUrl, {params: Params});
  }

  getMonthlyTotalAmounts(startDate: string, endDate: string): Observable<MonthlyTotals[]> {
    let Params = new HttpParams();
    Params = Params.append('startDate', startDate);
    Params = Params.append('endDate', endDate);
    const requestUrl = `${href}reports/monthly/amounts`;
    return this.http.get<MonthlyTotals[]>(requestUrl, {params: Params});
  }

  // convert raw data retrieved from db into format for fusion chart mscolumn2d
  prepareCategoryAmounts(data: ReportCategoryAmounts[]) {
  // variables for storing data needed to create chart
  const categoryData: Category[] = [];
  const budgetData: Budget[] = [];
  const ledgerData: Ledger[] = [];
    if (data != null) {
      for (const cat of data) {
        budgetData.push({value: cat.budget / 100});
        categoryData.push({label: cat.category});
        ledgerData.push({value: cat.ledger / 100});
      }
    } else {
      return {};
    }
    return {
        'chart': {
            'caption': 'Comparison of Budget to Actual Amounts Spent',
            'xAxisname': 'Category',
            'yAxisName': 'Amounts (In USD)',
            'numberPrefix': '$',
            'plotFillAlpha': '80',
            'theme': 'fint'
        },
        'categories': [{
            'category': categoryData
        }],
        'dataset': [{
            'seriesname': 'Budget',
            'data': budgetData
        }, {
            'seriesname': 'Actual',
            'data': ledgerData
        }]
      };
  }

  prepareMonthlyAmounts(data: MonthlyTotals[]) {
    const categoryData: Category[] = [];
    const budgetData: Budget[] = [];
    const ledgerData: Ledger[] = [];

    if (data != null) {
      for (const cat of data) {
        budgetData.push({value: cat.budget_total / 100});
        categoryData.push({label: cat.month});
        ledgerData.push({value: cat.ledger_total / 100});
      }
    } else {
      return {};
    }
    return {
        'chart': {
            'caption': 'Monthly Totals',
            'subcation': 'Last 12 Months',
            'xAxisname': 'Month',
            'showValues': '0',
            'theme': 'fint'
        },
        'categories': [{
            'category': categoryData
        }],
        'dataset': [{
          'seriesname': 'Budget',
          'data': budgetData
        }, {
          'seriesname': 'Actual',
          'data': ledgerData
        }]
      };
  }
}

export interface ReportCategoryAmounts {
  category: string;
  ledger: number;
  budget: number;
}

export interface MonthlyTotals {
  budget_total: number;
  ledger_total: number;
  month: string;
  year: number;
}

interface Category {
  label: string;
}

interface Budget {
  value: number;
}

interface Ledger {
  value: number;
}
