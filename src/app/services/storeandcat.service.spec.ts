import { TestBed, inject } from '@angular/core/testing';

import { StoreandcatService } from './storeandcat.service';

describe('StoreandcatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreandcatService]
    });
  });

  it('should be created', inject([StoreandcatService], (service: StoreandcatService) => {
    expect(service).toBeTruthy();
  }));
});
