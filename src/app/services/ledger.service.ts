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

import { CONFIGS } from '../shared/configurations';
import { Ledger } from '../shared/ledger';


@Injectable()
export class LedgerService {

  constructor(private http: HttpClient, private dateservice: DateService) { }

  createNewEntry(ledger, urlFrag: string): Observable<Ledger> {
    // method accepts a ledger object and posts a new entry.
    // urlFrag
    const href = CONFIGS.baseUrl;
    const requestUrl =`${href}create${urlFrag}`;
    return this.http.post<Ledger>(requestUrl, ledger);
  }

  deleteEntry(id: number, urlFrag: string) {
    const href = CONFIGS.baseUrl;
    const requestUrl =`${href}${urlFrag}-entry/${id}`;
    return this.http.delete<number>(requestUrl);
  }

}