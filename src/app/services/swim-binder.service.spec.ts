import { TestBed } from '@angular/core/testing';

import { SwimBinderService } from './swim-binder.service';

describe('SwimBinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwimBinderService = TestBed.get(SwimBinderService);
    expect(service).toBeTruthy();
  });
});
