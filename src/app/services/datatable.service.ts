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
import { Balance } from '../shared/balance';

import { CONFIGS } from '../shared/configurations';

@Injectable()
export class DatatableService {

  constructor(private http: HttpClient, private dateservice: DateService) { }

  // dataType must be either budget-entries or ledger-entries. It is used to query for type of datatable entries.
  getEntries(dataType: string, startDate: string, endDate: string): Observable<TableEntries[]> {
    // const href = 'http://localhost:5000/';
    const href = CONFIGS.baseUrl;
    const requestUrl =`${href}${dataType}/${startDate}/${endDate}`;
    return this.http.get<TableEntries[]>(requestUrl);
  }

  getBalances(startDate: string, endDate: string): Observable<Balance> {
    const href = CONFIGS.baseUrl;
    const requestUrl =`${href}balances/${startDate}/${endDate}`;
    return this.http.get<Balance>(requestUrl);
  }
}

export interface TableEntries {
  id: number;
  credit: number;
  debit: number;
  trans_date: string;
  cat: Category;
  store: Store;
}

export interface Category {
  id: number;
  category_name: string;
}

export interface Store {
  id: number;
  store_name: string;
}
