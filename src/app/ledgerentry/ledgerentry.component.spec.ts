import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerentryComponent } from './ledgerentry.component';

describe('LedgerentryComponent', () => {
  let component: LedgerentryComponent;
  let fixture: ComponentFixture<LedgerentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
