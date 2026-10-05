import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { employeeProfileGuard } from './employee-profile-guard';

describe('employeeProfileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => employeeProfileGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
