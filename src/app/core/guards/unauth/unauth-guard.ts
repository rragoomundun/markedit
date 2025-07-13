import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Store } from '../../../shared/services/store/store';

export const unauthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const storeService: Store = inject(Store);

  if (storeService.user === null) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
