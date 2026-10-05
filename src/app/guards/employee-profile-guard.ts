import { CanActivateFn } from '@angular/router';

export const employeeProfileGuard: CanActivateFn = (route, state) => {
  return true;
};
