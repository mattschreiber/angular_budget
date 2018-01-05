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
    Params = Params.append('firstParameter', month);
    Params = Params.append('secondParameter', year);
    const requestUrl =`${href}reports/categories`;
    return this.http.get<ReportCategoryAmounts[]>(requestUrl, {params: Params});
  }

}

export interface ReportCategoryAmounts {
  category: string;
  ledger: number;
  budget: number;
}
