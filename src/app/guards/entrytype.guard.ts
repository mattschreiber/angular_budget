import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
// This guards insures that the params for the ledgerentry / budgetentry route are only budget or ledger
export class EntrytypeGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (next.params['entrytype'] === 'ledger' || next.params['entrytype'] === 'budget') {
        return true;
      } else {
        this.router.navigate(['/**']); // redirectTo page not found
        return false;
      }

  }
}
