import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
// import * as CarbonTheme from 'fusioncharts/themes/fusioncharts.theme.carbon';
// import * as ZuneTheme from 'fusioncharts/themes/fusioncharts.theme.zune';
// import * as OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';

import { ReportsRoutingModule } from './reports-routing.module';
import { CategoryChartComponent } from './category-chart/category-chart.component';
import { BudgetLedgerAmountChartComponent } from './budget-ledger-amount-chart/budget-ledger-amount-chart.component';

import { DateService } from '../services/date.service';
import { ReportService } from './services/report.service';
// import { AuthInterceptor } from '../auth.interceptor';
// import { JwtInterceptor } from '../jwt.interceptor';

// import { AuthService } from '../services/auth.service';

import 'hammerjs';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpModule,
    HttpClientModule,
    FusionChartsModule,
    MatGridListModule,
    MatSelectModule,
    ReportsRoutingModule
  ],
  declarations: [CategoryChartComponent, BudgetLedgerAmountChartComponent],
  providers: [HttpClientModule, DateService, ReportService,
    // AuthService,
    // {
    //   provide : HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi   : true,
    // },{
    //   provide : HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true,
    // },
  ]
})
export class ReportsModule { }
