import { TestBed, async, inject } from '@angular/core/testing';

import { EntrytypeGuard } from './entrytype.guard';

describe('EntrytypeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntrytypeGuard]
    });
  });

  it('should ...', inject([EntrytypeGuard], (guard: EntrytypeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
