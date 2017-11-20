import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
  MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatMenuModule, MatPaginatorModule, MatTableModule, MatSortModule,
  MatNativeDateModule} from '@angular/material';

import 'hammerjs';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TableLedgerComponent } from './table-ledger/table-ledger.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableLedgerComponent
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
    MatTableModule, MatSortModule, MatNativeDateModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
