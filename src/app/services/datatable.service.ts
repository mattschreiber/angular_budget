import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { DateService } from '../services/date.service';

import { Ledger } from '../shared/ledger';

@Injectable()
export class DatatableService {

  constructor(private http: HttpClient, private dateservice: DateService) { }

  // dataType must be either budget-entries or ledger-entries. It is used to query for type of datatable entries.
  getRepoIssues(dataType: string, startDate: string, endDate: string): Observable<TableEntries[]> {
    const href = 'http://localhost:5000/';
    const requestUrl =`${href}${dataType}/${startDate}/${endDate}`;
    console.log(requestUrl);
    return this.http.get<TableEntries[]>(requestUrl);
  }
}

export interface TableEntries {
  id: number;
  credit: number;
  debit: number;
  trans_date: string;
  store_name: number;
  category_name: number;
  store_id: number;
  category_id: number;
}
