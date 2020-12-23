import { TestBed } from '@angular/core/testing';

import { PaymenttypeService } from './paymenttype.service';

describe('PaymenttypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymenttypeService = TestBed.get(PaymenttypeService);
    expect(service).toBeTruthy();
  });
});
