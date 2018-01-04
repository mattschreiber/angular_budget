import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';

import { ReportsRoutingModule } from './reports-routing.module';
import { CategoryChartComponent } from './category-chart/category-chart.component';

import { DateService } from '../services/date.service';
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
  declarations: [CategoryChartComponent],
  providers: [HttpClientModule, DateService,
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
