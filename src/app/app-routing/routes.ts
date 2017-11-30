import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { BudgetComponent } from '../budget/budget.component';
import { LedgerentryComponent } from '../ledgerentry/ledgerentry.component';
import { TableLedgerComponent } from '../table-ledger/table-ledger.component'

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'budget',     component: BudgetComponent },
  { path: 'ledgerentry', component: LedgerentryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
