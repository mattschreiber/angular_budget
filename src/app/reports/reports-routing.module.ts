import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryChartComponent } from './category-chart/category-chart.component';
import { BudgetLedgerAmountChartComponent } from './budget-ledger-amount-chart/budget-ledger-amount-chart.component';

const routes: Routes = [
  { path: 'category-chart', component: CategoryChartComponent },
  { path: 'budget-ledger-chart', component: BudgetLedgerAmountChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
