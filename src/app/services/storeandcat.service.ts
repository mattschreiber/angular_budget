import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { CONFIGS } from '../shared/configurations';

import { Store } from '../shared/store';
import { Category } from '../shared/category';

@Injectable()
export class StoreandcatService {

  constructor(private http: HttpClient) { }

  getStoreAndCat(): Observable<StoreAndCat> {
    const href = CONFIGS.baseUrl;
    const requestUrl =`${href}store-category`;
    return this.http.get<StoreAndCat>(requestUrl);
  }

}

export interface StoreAndCat {
  category: Category[]
  store: Store[];
}
