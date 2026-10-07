import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RoleService } from '../services/role.service';

export const adminGuard: CanActivateFn = () => {

  const roleService = inject(RoleService);
  const router = inject(Router);

  if (roleService.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/tasks']);
};