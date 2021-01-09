import { Routes } from '@angular/router';

import { EntrytypeGuard } from '../guards/entrytype.guard';

import { LoginComponent } from '../login/login.component';
import { LedgerentryComponent } from '../ledgerentry/ledgerentry.component';
import { TableLedgerComponent } from '../table-ledger/table-ledger.component';
import { CreateStoreComponent } from '../create-store/create-store.component';
import { MonthlybudgetComponent } from '../monthlybudget/monthlybudget.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'ledger/:entrytype/:datatype', component: TableLedgerComponent},
  { path: 'budget/:entrytype/:datatype', component: TableLedgerComponent},
  { path: 'ledgerentry/:entrytype', component: LedgerentryComponent, canActivate: [EntrytypeGuard] },
  { path: 'createstore', component: CreateStoreComponent },
  { path: 'monthlybudget', component: MonthlybudgetComponent }, 
  { path: '', redirectTo: '/ledger/ledger/ledger-entries', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
