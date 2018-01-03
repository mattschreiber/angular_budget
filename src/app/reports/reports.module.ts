import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list';

import { ReportsRoutingModule } from './reports-routing.module';
import { CategoryChartComponent } from './category-chart/category-chart.component';

import 'hammerjs';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FusionChartsModule,
    MatGridListModule,
    ReportsRoutingModule
  ],
  declarations: [CategoryChartComponent]
})
export class ReportsModule { }
