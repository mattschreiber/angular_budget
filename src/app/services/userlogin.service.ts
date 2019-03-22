import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { User, Token } from '../shared/user';
import { CONFIGS } from '../shared/configurations';


@Injectable()
export class UserloginService {

  constructor(private http: HttpClient) { }

  public loginUser(user: User): Observable<Token> {
    // method accepts a ledger object and posts a new entry.
    // urlFrag
    user.username = user.username.toLowerCase();
    const href = CONFIGS.baseUrl;
    const requestUrl = `${href}login`;
    return this.http.post<Token>(requestUrl, user);
  }
}
