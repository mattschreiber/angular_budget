import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CONFIGS } from '../../shared/configurations';

const href = CONFIGS.baseUrl;

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  getReportCategoryAmounts(month: string, year: string): Observable<ReportCategoryAmounts[]> {
    let Params = new HttpParams();
    Params = Params.append('month', month);
    Params = Params.append('year', year);
    const requestUrl =`${href}reports/categories`;
    return this.http.get<ReportCategoryAmounts[]>(requestUrl, {params: Params});
  }

  // convert raw data retrieved from db into format for fusion chart mscolumn2d
  prepareCategoryAmounts(data: ReportCategoryAmounts[]) {
  // variables for storing data needed to create chart
  let categoryData: Category[] = [];
  let budgetData: Budget[] = [];
  let ledgerData: Ledger[] = [];
    if (data != null) {
      for (let cat of data) {
        budgetData.push({value: cat.budget / 100});
        categoryData.push({label: cat.category});
        ledgerData.push({value: cat.ledger / 100});
      }
    } else {
      return {}
    }
    return {
        "chart": {
            "caption": "Comparison of Budget to Actual Amounts Spent",
            "xAxisname": "Category",
            "yAxisName": "Amounts (In USD)",
            "numberPrefix": "$",
            "plotFillAlpha": "80",
            "theme": "fint"
        },
        "categories": [{
            "category": categoryData
        }],
        "dataset": [{
            "seriesname": "Budget",
            "data": budgetData
        }, {
            "seriesname": "Actual",
            "data": ledgerData
        }]
      }
  }

}

export interface ReportCategoryAmounts {
  category: string;
  ledger: number;
  budget: number;
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
