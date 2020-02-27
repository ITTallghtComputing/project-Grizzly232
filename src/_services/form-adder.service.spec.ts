import { TestBed } from '@angular/core/testing';

import { FormAdderService } from './form-adder.service';

describe('FormAdderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormAdderService = TestBed.get(FormAdderService);
    expect(service).toBeTruthy();
  });
});
