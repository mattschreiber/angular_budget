import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public getToken(): string {
   return "Bearer " + localStorage.getItem('mattsToken');
  }

  public setToken(token: string) {
    localStorage.setItem('mattsToken', token);
  }

}
