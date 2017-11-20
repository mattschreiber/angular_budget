import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLedgerComponent } from './table-ledger.component';

describe('TableLedgerComponent', () => {
  let component: TableLedgerComponent;
  let fixture: ComponentFixture<TableLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
