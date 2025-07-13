import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Store } from '../../../shared/services/store/store';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const storeService: Store = inject(Store);

  if (storeService.user !== null) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
