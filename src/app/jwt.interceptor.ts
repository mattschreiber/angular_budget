import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap, tap } from 'rxjs/operators';


import { AuthService } from './services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  return next.handle(req).pipe(
    tap((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      // do stuff with response if you want
    }
  }, (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  }));
}
}
