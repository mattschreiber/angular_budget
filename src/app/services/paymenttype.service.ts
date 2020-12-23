import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { CONFIGS } from '../shared/configurations';
import { PaymentType } from '../shared/paymenttype'; 

@Injectable({
  providedIn: 'root'
})
export class PaymenttypeService {

  constructor(private http: HttpClient ) { }

  getPaymentTypes(): Observable<PaymentType> {
    const href = CONFIGS.baseUrl;
    const requestUrl = `${href}payment-types`;
    return this.http.get<PaymentType>(requestUrl);
  }
}
