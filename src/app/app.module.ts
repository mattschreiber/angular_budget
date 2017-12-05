import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
  MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatMenuModule, MatPaginatorModule, MatTableModule, MatSortModule,
  MatNativeDateModule, MatAutocompleteModule, MatProgressBarModule} from '@angular/material';

import 'hammerjs';

import { AuthService } from './services/auth.service';
import { DateService } from './services/date.service';
import { LedgerService } from './services/ledger.service';
import { DatatableService } from './services/datatable.service';
import { StoreandcatService} from './services/storeandcat.service';

import { EntrytypeGuard } from './guards/entrytype.guard';

import { AuthInterceptor } from './auth.interceptor';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TableLedgerComponent } from './table-ledger/table-ledger.component';
import { HeaderComponent } from './header/header.component';
import { BudgetComponent } from './budget/budget.component';
import { LedgerentryComponent } from './ledgerentry/ledgerentry.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableLedgerComponent,
    HeaderComponent,
    BudgetComponent,
    LedgerentryComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatMenuModule, MatPaginatorModule,
    MatTableModule, MatSortModule, MatNativeDateModule, MatAutocompleteModule, MatProgressBarModule,
    AppRoutingModule,
  ],
  providers: [HttpClientModule, AuthService, DateService, LedgerService, DatatableService, StoreandcatService,
    EntrytypeGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
