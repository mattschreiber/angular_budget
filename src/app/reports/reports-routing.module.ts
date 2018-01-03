import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryChartComponent } from './category-chart/category-chart.component';

const routes: Routes = [
  { path: 'category-chart', component: CategoryChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
