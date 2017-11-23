import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public getToken(): string {
   // return localStorage.getItem('`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic29tZW9uZSIsImFkbWluIjp0cnVlLCJleHAiOjE1MTE0NTM4NTh9.Ce08Z_pnQDxBN8XxPDhY1gTCwECaZSWNLZNLug09s5A`');
   return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic29tZW9uZSIsImFkbWluIjp0cnVlLCJleHAiOjE1MTE0NTM4NTh9.Ce08Z_pnQDxBN8XxPDhY1gTCwECaZSWNLZNLug09s5A"
    }

}
