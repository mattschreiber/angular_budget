import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
  MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatMenuModule, MatPaginatorModule, MatTableModule, MatSortModule,
  MatNativeDateModule, MatAutocompleteModule, MatProgressBarModule, MatTooltipModule,
  MatSidenavModule, MatExpansionModule} from '@angular/material';

import 'hammerjs';

import { AuthService } from './services/auth.service';
import { DateService } from './services/date.service';
import { LedgerService } from './services/ledger.service';
import { DatatableService } from './services/datatable.service';
import { StoreandcatService} from './services/storeandcat.service';
import { PaymenttypeService } from './services/paymenttype.service';
import { UserloginService} from './services/userlogin.service';
import { SidenavService } from './services/sidenav.service';

import { EntrytypeGuard } from './guards/entrytype.guard';

import { AuthInterceptor } from './auth.interceptor';
import { JwtInterceptor } from './jwt.interceptor';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TableLedgerComponent } from './table-ledger/table-ledger.component';
import { HeaderComponent } from './header/header.component';
import { BudgetComponent } from './budget/budget.component';
import { LedgerentryComponent } from './ledgerentry/ledgerentry.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { ReportsModule } from './reports/reports.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { UpdateEntryComponent } from './update-entry/update-entry.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { MonthlybudgetComponent } from './monthlybudget/monthlybudget.component';
import { MonthYearComponent } from './month-year/month-year.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableLedgerComponent,
    HeaderComponent,
    BudgetComponent,
    LedgerentryComponent,
    PageNotFoundComponent,
    LoginComponent,
    UpdateEntryComponent,
    CreateStoreComponent,
    MonthlybudgetComponent,
    MonthYearComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatSidenavModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatMenuModule, MatPaginatorModule, MatExpansionModule,
    MatTableModule, MatSortModule, MatNativeDateModule, MatAutocompleteModule, MatProgressBarModule, MatTooltipModule,
    ReportsModule,
    AppRoutingModule,
  ],
  entryComponents: [
    UpdateEntryComponent
  ],
  providers: [HttpClientModule, AuthService, DateService, LedgerService, DatatableService, StoreandcatService, PaymenttypeService,
    UserloginService, SidenavService, EntrytypeGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }, {
      provide : HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
