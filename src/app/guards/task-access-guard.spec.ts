import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { taskAccessGuard } from './task-access-guard';

describe('taskAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => taskAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
