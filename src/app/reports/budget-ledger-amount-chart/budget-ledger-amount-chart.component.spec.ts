import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetLedgerAmountChartComponent } from './budget-ledger-amount-chart.component';

describe('BudgetLedgerAmountChartComponent', () => {
  let component: BudgetLedgerAmountChartComponent;
  let fixture: ComponentFixture<BudgetLedgerAmountChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetLedgerAmountChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetLedgerAmountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
