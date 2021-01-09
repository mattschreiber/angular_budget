import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlybudgetComponent } from './monthlybudget.component';

describe('MonthlybudgetComponent', () => {
  let component: MonthlybudgetComponent;
  let fixture: ComponentFixture<MonthlybudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlybudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlybudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
