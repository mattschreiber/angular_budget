import { Routes } from '@angular/router';

import { EntrytypeGuard } from '../guards/entrytype.guard';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { BudgetComponent } from '../budget/budget.component';
import { LedgerentryComponent } from '../ledgerentry/ledgerentry.component';
import { TableLedgerComponent } from '../table-ledger/table-ledger.component';
import { CreateStoreComponent } from '../create-store/create-store.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home',  component: HomeComponent },
  { path: 'budget',     component: BudgetComponent },
  { path: 'ledgerentry/:entrytype', component: LedgerentryComponent, canActivate: [EntrytypeGuard] },
  { path: 'createstore', component: CreateStoreComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
