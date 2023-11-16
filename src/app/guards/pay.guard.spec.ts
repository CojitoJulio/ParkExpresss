import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { payGuard } from './pay.guard';

describe('payGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => payGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
