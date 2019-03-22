import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';







import { DateService } from '../services/date.service';

import { CONFIGS } from '../shared/configurations';
import { Ledger } from '../shared/ledger';


@Injectable()
export class LedgerService {

  constructor(private http: HttpClient, private dateservice: DateService) { }

  createNewEntry(ledger, urlFrag: string): Observable<Ledger> {
    // method accepts a ledger object and posts a new entry.
    // urlFrag
    // clone ledger object, convert credit/debit to to cents and then post to db
    const ledgerCopy = Object.assign({}, ledger);
    ledgerCopy.credit = +(ledgerCopy.credit * 100).toFixed(2);
    ledgerCopy.debit = +(ledgerCopy.debit * 100).toFixed(2);
    const href = CONFIGS.baseUrl;
    const requestUrl = `${href}create${urlFrag}`;
    return this.http.post<Ledger>(requestUrl, ledgerCopy);
  }

  deleteEntry(id: number, urlFrag: string) {
    const href = CONFIGS.baseUrl;
    const requestUrl = `${href}${urlFrag}-entry/${id}`;
    return this.http.delete<number>(requestUrl);
  }

}
