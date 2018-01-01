import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BudgetComponent implements OnInit {
  // dataType must be either budget-entries or ledger-entries. It is used to query for type of datatable entries.
  // This is passed to the query that populates the datatable within the table-ledger component
  dataType: string = 'budget-entries';
  showBalance: boolean = true; // Determines whether or not to show Ledger and Budget Amounts
  entryType: string = "Budget" // Sets header for table-ledger to either Ledger or Budget
  // end input variables

  constructor() { }

  ngOnInit() {
  }

}
