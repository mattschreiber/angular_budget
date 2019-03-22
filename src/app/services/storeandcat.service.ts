import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { CONFIGS } from '../shared/configurations';

import { Store } from '../shared/store';
import { Category } from '../shared/category';

@Injectable()
export class StoreandcatService {

  constructor(private http: HttpClient) { }

  getStoreAndCat(): Observable<StoreAndCat> {
    const href = CONFIGS.baseUrl;
    const requestUrl = `${href}store-category`;
    return this.http.get<StoreAndCat>(requestUrl);
  }

  createStore(store: Store): Observable<Store> {
    // let ledgerCopy = Object.assign({}, ledger);
    const href = CONFIGS.baseUrl;
    const requestUrl = `${href}createstore`;
    return this.http.post<Store>(requestUrl, store);
  }

}

export interface StoreAndCat {
  category: Category[];
  store: Store[];
}
