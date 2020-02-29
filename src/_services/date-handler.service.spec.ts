import { TestBed } from '@angular/core/testing';

import { DateHandlerService } from './date-handler.service';

describe('DateHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateHandlerService = TestBed.get(DateHandlerService);
    expect(service).toBeTruthy();
  });
});
