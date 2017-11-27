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
export class LedgerService {

  constructor(private http: HttpClient, private dateservice: DateService) { }

  getRepoIssues(): Observable<LedgerEntries[]> {
    const href = 'http://localhost:5000/ledger-entries/';
    const requestUrl =`${href}${this.dateservice.parseDate(this.dateservice.firstDayMonth)}/${this.dateservice.parseDate(this.dateservice.todayDate)}`;
    console.log(requestUrl);
    return this.http.get<LedgerEntries[]>(requestUrl);
  }

}

export interface LedgerEntries {
  id: number;
  credit: number;
  debit: number;
  trans_date: string;
  store_name: number;
  category_name: number;
  store_id: number;
  category_id: number;
}
