import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { BudgetComponent } from '../budget/budget.component';
import { TableLedgerComponent } from '../table-ledger/table-ledger.component'

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'budget',     component: BudgetComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
