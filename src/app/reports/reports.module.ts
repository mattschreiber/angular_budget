import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list';

import { ReportsRoutingModule } from './reports-routing.module';
import { CategoryChartComponent } from './category-chart/category-chart.component';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    ReportsRoutingModule
  ],
  declarations: [CategoryChartComponent]
})
export class ReportsModule { }
