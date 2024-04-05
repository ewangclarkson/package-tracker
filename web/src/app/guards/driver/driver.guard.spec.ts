import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { driverGuard } from './driver.guard';

describe('driverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => driverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
